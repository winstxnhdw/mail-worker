# mail-worker

[![main.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml)

`mail-worker` is a [Cloudflare Workers](https://workers.cloudflare.com/) that sends emails using [AWS SES](https://aws.amazon.com/ses/).

## Deploy

Deploy to Cloudflare Workers with the following.

```bash
yarn deploy
```

## Verify Email

To use any sender email, the email must first be verified. The verification will require the following environment variables. You may populate your environment with the following.

```bash
echo AWS_REGION=YOUR_AWS_REGION >> .env
echo AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID >> .env
echo AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY >> .env
```

Now, pipe your email as stdin to the `verify-email` script.

```bash
echo YOUR_EMAIL | yarn verify-email
```
