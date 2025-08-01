---
title: A Gemini Bug's Journey Through Google's Escalation Chain
author: Thinh TRUONG
pubDatetime: 2025-08-01T19:29:56Z
slug: a-gemini-bugs-journey-through-googles-escalation-chain
featured: true
draft: false
tags:
  - gemini
  - google
  - genai
  - bug-tracking
  - issue-escalation
  - python
  - function-calling
  - llm
  - case-study

description: "A behind-the-scenes look at how a high-priority bug is handled at Google. This post tracks a real-world issue with Gemini's function calling, tracing its public escalation on GitHub from a routine report to direct updates from Google DeepMind's top leadership."
---

![Post OG Image](/posts/a-gemini-bugs-journey-through-googles-escalation-chain/index.png)

## Table of Contents

## Introduction

I have been following an issue with a Gemini model from Google and I could clearly see how it escalated through the ranks. This post does not in any way try to be educational, but rather a miscellaneous anecdote.

## Model Release

Up until this point, their models that can handle audio input and output are **half-cascade** models, they treat audio input as tokens and then output audio using a text-to-speech model. On May 20th 2025, Google released a new audio native LLM model, **Gemini 2.5 Flash Native Audio**, under the endpoint `gemini-2.5-flash-preview-native-audio-dialog` through the Gemini API. This model is able to handle audio input and output natively, without the need for a text-to-speech model, even with thinking capabilities. Effectively, after testing it myself, it is a capable model that can understand and respond to user's audio input in a natural way, even able to understand user's emotions, which is a big step forward in the field of audio native LLMs.

## Issue Discovery

On May 22nd 2025, an issue was discovered with the model. It was reported that the model executes function calls [inconsistently](https://github.com/googleapis/python-genai/issues/843).
![Github Issue](/assets/images/gemini/gemini-issue-1.png)

In my observation, most of the issues on this repo are assigned to janasangeetha. As for this one, it went seemingly under the radar for a while, with only people chiming in to report the issue, their workarounds or their speculations for the cause of the issue.

## Escalation

On June 25th 2025, more than a month later, an engineer from Google finally responded to the issue, acknowledging it and stating that they are looking into it, everyone was rejoicing thinking that finally the issue will be fixed soon.
![Github Issue Response](/assets/images/gemini/gemini-issue-2.png)

Google went radio silence on the issue until July 11th 2025, when an engineer from Google posted an update, stating that this issue was more complicated than they thought and that they are still working on it.

![Github Issue Update](/assets/images/gemini/gemini-issue-3.png)

This person turned out the be an Engineering Manager at Google Deepmind, which is a sign that this bug was bigger than expected. The issue was escalated to the point where an Engineering Manager had to step in. The latest update was given on July 21st 2025, by Logan Kilpatrick himself, the big boss of Gemini models, stating that they are still working on it but they expect to release a fix in the next model release.

![Latest Update](/assets/images/gemini/gemini-issue-4.png)

## Conclusion

This is my first account of seeing how an issue gets escalated at Google, we can infer that it went from the usual repo maintainers of a SDK to an Engineering Manager, and finally to the last person that you could expect an an update from, the big boss of Gemini models. This shows that indeed it was a big issue with the model itself and they won't be able to fix it without retraining or updating the model itself. I am looking forward to the next model release and hopefully this issue will be fixed.

## Bonus

Hanging around this repo, I found a hilarious instance of a person roasting the maintainers of the repo and Google for the lack of features in this SDK regarding structured output, which is a common feature in other GenAI SDKs.

![Roast](/assets/images/gemini/gemini-issue-5.png)

This person suggested how these features could be implemented in the SDK. The maintainers of the repo had to split it into multiple issues, which aren't still all resolved, but they are working on it.

![Roast Response](/assets/images/gemini/gemini-issue-6.png)
