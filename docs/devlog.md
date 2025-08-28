# Scope of document

This document is supposed to collect the experience along the development process.

I decided to write down my thought process and experience, because I wanted to understand why I felt uneasy about my progress and I am regularly questioning my approach. So up until Aug-26, 2025 the log is written from my memory. 

# Log

## Starting context and history August 2025

The owner of a wine bar that I visit occasionally told me about spending roughly 7000 Euro per year on new glassware, because guests do not return the glasses they had used. The owner estimated 90 glasses not being returned.  

Establishing the usual deposit did not seem feasible from the owner's perspective. I assumed that such solution would slow down the payment process, because the gets very busy during opening hours (up to 5 or 6 am in the morning), especially during summer times.

Aug-13, 2025. Strolling outside, I wondered if there is a possibility to digitalize the glassware deposit without interfering with the payment process or the workflow at the bar. The typical event venue/bar deposit focuses on guests paying the deposit upfront and making them return their glassware, because they want to get back their deposit money. So not returning feels like a loss. I thought that there may be another motivation: An incentive to motivate people return glassware by themselves independently from any deposit amount, e.g. a gamified approach. 

So the idea is to build a stat system or a ladder of people returning their glassware. They may do this for fun or competition. A different approach can be that by returning glassware one can earn points that can be spent on bar merch.

So, on Aug-15, 2025, I asked ChatGPT for a web search on digital glassware deposit apps or projects. It did not find anything.

Since I was on a the look for a new job with a focus on data analysis and programming, I decided to take the realization of my idea as a personal project and use it for the following purposes
* show myself that I can take a project from idea to prototype
* showcase a project for application purposes
* show the prototype to the bar owner I learned the problem from
* work on something that makes me feel productive and that I can control

I wanted to meet one major requirement: Expose the least possible interference with the payment process for the bar crew and guests.

## Make the framework work

Setup of frontend and backend.
make it work in local dev environment

Linked a postgresql database that is hosted on supabase
Code generation switched to Claude Sonnet 4, because it seems to be better suited for coding projects.

Continue to develop the page and user experience.

learned more about APIs and environment variables