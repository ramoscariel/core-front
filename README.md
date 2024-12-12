# core-front

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
## Description

This project uses [md-editor-v3](https://github.com/imzbf/md-editor-v3) to create a basic blog application that allows users to create posts using Markdown and adding tags to each post to make it easier to search content.

It communicates with a [backend](https://github.com/ramoscariel/core-back) deployed in [Render](https://render.com/).

## Features

### User Login/Registration

A basic implementation of login/register functionality.
A "Login Session" is handled using jwt which is also used to authorize "protected actions" like creating or editing posts.

## Post Creation

A post is a very simple data entity which is also related to 1 or more tags. This guarantees that all posts are findable through tag filers.

## Votes

Users can vote positively or negatively to a post and everyone can see what posts are liked by what user.

## Filters

Allow to search content by **Title**, **Tags**, and **Creation Date**.
