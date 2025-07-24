---
title: Faster Python Dependency Management with UV and Multi-Stage Docker Builds
author: Thinh TRUONG
pubDatetime: 2025-07-23T21:39:41Z
slug: faster-python-dependency-management-with-uv-and-multi-stage-docker-builds
featured: true
draft: false
tags:
  - docker
  - uv
  - migration
  - python
  - multi-stage

description: "Learn how to speed up your Python dependency management using UV and multi-stage Docker builds. This post covers what UV is, how to migrate from pip to UV, and the benefits of using multi-stage builds in Docker for faster deployments."
---

![Post OG Image](/posts/faster-python-dependency-management-with-uv-and-multi-stage-docker-builds/index.png)

## Table of Contents

## What is UV?

You can see [UV](https://docs.astral.sh/uv/) as a package/dependency manager for Python, similar to `pip`. It's written in Rust and we all know that anything written in Rust is amazing and fast. UV is ["10-100x faster than pip"](https://github.com/astral-sh/uv/blob/main/BENCHMARKS.md), it was developed by the same people who created [ruff](https://github.com/astral-sh/ruff).

## How to Migrate from pip to UV

Of course when you see those claims, you want to try it out. To install UV, you can use `pip`:

```bash
pip install uv
```

Or just `curl` it:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

If you just want to use it as a drop-in replacement for `pip`, you can do so by using the `uv` command instead of `pip`. For example, to install a package:

```bash
uv install -r requirements.txt
```

However, UV can replace `pip` in more ways than just installing packages. It can also handle virtual environments, package management, and more. In order to fully utilize UV, first you need to migrate your existing `requirements.txt` file to a `pyproject.toml` file. You can do this by running:

```bash
uv init
```

This will create a `pyproject.toml` file in your project directory. Copy and paste your existing dependencies from `requirements.txt` into the `pyproject.toml` file under the `[project.dependencies]` section. For example:

```toml
[project]
name = "my-awesome-project"
version = "0.0.1"
description = "Add your description here"
readme = "README.md"
requires-python = "==3.11.11"
dependencies = [
    "django==5.2",
    "djangorestframework>=3.15.1",
    "djangorestframework-simplejwt>=5.3.1",
    "drf-yasg>=1.21.10",
    "gunicorn>=23.0.0",
    "psycopg[binary]>=3.2.9",
    "requests>=2.32.4",
]

[dependency-groups]
dev = [
    "ruff>=0.6.1",
    "pytest>=7.4.0",
]
```

Now you can safely remove your `requirements.txt` file, as UV will use the `pyproject.toml` file to manage your dependencies, to create a virtual environment using the specified Python version, and to install the dependencies, use the following command:

```bash
uv sync
```

This will create a virtual environment in the `.venv` directory and install the dependencies specified in the `pyproject.toml` file. A `uv.lock` file will also be created to lock the dependencies to specific versions.

## Deploy your application with Docker

Now that you have migrated your project to use UV, you can deploy your application using Docker. The following is a simple example of a Dockerfile with UV installed:

```dockerfile
# Use a Python image with uv pre-installed
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

# Install the project into `/app`
WORKDIR /app

# Enable bytecode compilation
ENV UV_COMPILE_BYTECODE=1

# Copy from the cache instead of linking since it's a mounted volume
ENV UV_LINK_MODE=copy

# Install the project's dependencies using the lockfile and settings
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev

# Then, add the rest of the project source code and install it
# Installing separately from its dependencies allows optimal layer caching
COPY . /app
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-dev


# Install gcc and other build dependencies.
RUN apt-get update && \
    apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Place executables in the environment at the front of the path
ENV PATH="/app/.venv/bin::$PATH"
WORKDIR /app

EXPOSE 6969
# run your application
CMD ["uv", "run", "--host", "0.0.0.0", "--port", "6969"]
```

Congrats, now you have a Dockerfile that uses UV to manage your Python dependencies and runs your application.

However, you will notice that the build time may not be as fast as you can get it to be and the size of the image may be larger than expected.

This is because the Dockerfile above contains UV, installs all the dependencies and all the debian packages required to run your application, and then runs the application. This is not optimal for production use, as it will result in a larger image size and longer build times.

## Multi-Stage Docker Builds

To optimize your Docker image size and build time, you can use multi-stage builds. Multi-stage builds allow you to separate the build environment from the runtime environment, which can significantly reduce the size of your final image.

You can have builder image that installs UV, the dependencies, the debian packages, etc, and then copy only the necessary files to the final image. Here's an example of how to do that:

```dockerfile
# Standalone Python build with multistage images, based on:
# https://github.com/astral-sh/uv-docker-example/blob/main/standalone.Dockerfile
# First, build the application in the `/app` directory
FROM ghcr.io/astral-sh/uv:bookworm-slim AS builder
ARG INSTALL_DEV_DEPS
ENV UV_COMPILE_BYTECODE=1 UV_LINK_MODE=copy

# Configure the Python directory so it is consistent
ENV UV_PYTHON_INSTALL_DIR=/python

# Only use the managed Python version
ENV UV_PYTHON_PREFERENCE=only-managed

# Install Python before the project for caching
RUN uv python install 3.11.11
RUN echo "INSTALL_DEV_DEPS=$INSTALL_DEV_DEPS"
WORKDIR /app
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project $(if [ "$INSTALL_DEV_DEPS" = "1" ]; then echo ""; else echo "--no-dev"; fi)

# Then, add the rest of the project source code and install it
# Installing separately from its dependencies allows optimal layer caching
COPY . /app
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked $(if [ "$INSTALL_DEV_DEPS" = "1" ]; then echo ""; else echo "--no-dev"; fi)


# Install gcc and other build dependencies.
RUN apt-get update && \
    apt-get install -y \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Then, use a final image without uv
FROM debian:bookworm-slim


# Copy the Python version
COPY --from=builder /python /python

# Copy the application from the builder image
COPY --from=builder /app /app

# Place executables in the environment at the front of the path
ENV PATH="/app/.venv/bin:/python/bin:$PATH"

# Set the working directory
WORKDIR /app
# Expose the port your application runs on
EXPOSE 6969
# Run your application
CMD ["python3", "--host", "0.0.0.0", "--port", "6969"]
```

This is not real code of course, in my real use case, I reduced build time and image size by 50% by using multi-stage builds. The first stage installs UV, the dependencies, and the debian packages required to run your application. The second stage copies only the necessary files from the first stage and runs your application.

## Conclusion

In this post, we learned how to speed up our Python dependency management using UV and multi-stage Docker builds. We saw how to migrate from `pip` to UV, how to deploy our application with Docker, and how to optimize our Docker image size and build time using multi-stage builds.

Big thanks to the amazing folks at [Astral](https://astral.sh/) for creating UV and making it available to the community.

You can check out the docs and references I used to write this post:

- [UV Documentation](https://docs.astral.sh/uv/)
- [UV GitHub Repository](https://github.com/astral-sh/uv)
- [UV Docker Example](https://github.com/astral-sh/uv-docker-example)
