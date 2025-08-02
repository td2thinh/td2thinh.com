---
title: "Resolving Docker Push Errors: The Unexpected 400 Bad Request from AWS ECR"
author: Thinh TRUONG
pubDatetime: 2025-08-02T13:56:42Z
slug: unexpected-400-bad-request-from-aws-ecr
featured: true
draft: false
tags:
  - docker
  - aws
  - ecr
  - error
  - troubleshooting
  - devops
  - terraform
  - containerd
  - image-store
  - aws-ecr
  - ci-cd
  - image-immutability
description: 'Encountering a persistent "400 Bad Request" when pushing to AWS ECR? Discover the root cause related to Docker Desktop''s containerd image store and how to fix it quickly.'
---

![Post OG Image](/posts/unexpected-400-bad-request-from-aws-ecr/index.png)

## Table of Contents

## Introduction

AWS Elastic Container Registry (ECR) is a fully managed Docker container registry that makes it easy to store, manage, and deploy Docker container images. During the week, I encountered an unexpected 400 Bad Request error while trying to push a Docker image to ECR. This post details the issue and how I resolved it.

## The Issue

While following our DevOps' docs on how to deploy to development environment, I ran the command to push a Docker image to ECR:

```bash
docker push <your-ecr-repo-uri>:<your-image-tag>
```

Instead of the expected success message, I received a 400 Bad Request error:

```
error: failed to solve: failed commit on ref "...": unexpected status: 400 Bad Request
```

Even though the image was seemingly built and pushed successfully, as I could see it in the ECR repo on the AWS console, the error persisted. Instead of deploying the image to the development environment, I tried to find out what caused it and how to fix it.

## Troubleshooting

After Googling around for a while, I found that this error occured due to the image immutability settings in ECR. When enabled, once an image is pushed, it cannot be overwritten or deleted. This is a useful feature to prevent accidental overwrites. The Terraform config for the ECR repo could look like this:

```hcl
resource "aws_ecr_repository" "foo" {
  name                 = "bar"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}
```

If the `image_tag_mutability` is set to `IMMUTABLE`, any attempt to push an image with the same tag will result in a 400 Bad Request error. Simply changing the `image_tag_mutability` to `MUTABLE` would resolve the issue, allowing you to push images with the same tag without encountering the error.

![Terraform Config](/assets/images/aws-ecr/image-1.png)

However, I wasn't sure why my image was being pushed with the same tag, as I had just built it, I had make sure that each image I was trying to push had a unique tag. I would not want to change the Terraform config to make the image tag mutable, as it is out of my scope and I don't want to change the behavior of the ECR repo. I decided to investigate further.

## Resolution

After some more digging, I found that the issue was caused by the Docker image store, especially with Docker's `containerd`. It is the container runtime that is used "under the hood by Docker Engine for creating, starting, and stopping containers". The classic Docker image store is "pushing, pulling, and storing images on the filesystem" while using `containerd` as image store, you can unlock a range of new features. However, as it turns out, ECR uses Docker's Overlay2 storage driver, when build and push images with `containerd`, for whatever reason, calls `ecr:PutImage` API to the same layer multiple times, resulting in the 400 Bad Request error.

I didn't even know that I was using `containerd` as image store, but it turns out that it is the default for Docker Desktop version 4.34 and later, which is how I installed Docker on my Mac. It seems like the only way to switch back to the classic Docker image store is using the Docker Desktop GUI settings. Once I switched back to the classic Docker image store, I was able to push the image to ECR without any issues.

## Conclusion

In conclusion, the unexpected 400 Bad Request error from AWS ECR was caused by the immutability settings of the ECR repository and the use of `containerd` as the image store in Docker. By switching back to the classic Docker image store, I was able to resolve the issue and successfully push my Docker image to ECR.

## References

- https://docs.docker.com/desktop/features/containerd/
- https://github.com/CircleCI-Public/aws-ecr-orb/issues/200
- https://stackoverflow.com/questions/75131872/error-failed-to-solve-failed-commit-on-ref-unexpected-status-400-bad-reques
- https://github.com/aws/aws-cdk/issues/31549
