# mail-worker

[![main.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/main.yml)
[![deploy.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/deploy.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/deploy.yml)
[![formatter.yml](https://github.com/winstxnhdw/mail-worker/actions/workflows/formatter.yml/badge.svg)](https://github.com/winstxnhdw/mail-worker/actions/workflows/formatter.yml)

`mail-worker` is a robust [Cloudflare Worker](https://workers.cloudflare.com/) built for sending emails with [AWS SES](https://aws.amazon.com/ses/) and [Bun](https://github.com/oven-sh/bun).

## Development

Install all dependencies.

```bash
bun install
```

## Usage

`POST` **`/`** `(send email to recipient(s))`

### Request Headers

> | name           |  type    | description                       |
> | -------------- | -------- | --------------------------------- |
> | X-Auth-Token   | optional | `AUTH_TOKEN` environment variable |

### Parameters

> | name      |  type    | data type               | description                                                           |
> | --------- | -------- | ----------------------- | --------------------------------------------------------------------- |
> | to        | required | `string[]`              | recipient's email address(es)                                         |
> | from      | required | `string`                | sender's email address                                                |
> | subject   | required | `string`                | email subject                                                         |
> | html      | required | `string`                | email content                                                         |

### Responses

> | http code     | content-type                   | response                                                              |
> | ------------- | ------------------------------ | --------------------------------------------------------------------- |
> | `200`         | `text/plain`                   | `Email sent!`                                                         |
> | `400`         | `text/plain`                   | `Invalid request!`                                                    |
> | `401`         | `text/plain`                   | `Unauthorised! Please check your token in the request.`               |
> | `500`         | `text/plain`                   | `Failed to send email!`                                               |

### Example cURL

> ```bash
> curl $MAIL_WORKER_ENDPOINT -H "Content-Type: application/json" -d \
> '{
>    "to": ["test@test.com"],
>    "from": "test@test.com",
>    "subject": "test",
>    "html": "test"
>  }'
> ```

### Example cURL with Authentication

> ```bash
> curl $MAIL_WORKER_ENDPOINT \
>   -H "X-Auth-Token: $AUTH_TOKEN" \
>   -H "Content-Type: application/json" -d \
> '{
>    "to": ["test@test.com"],
>    "from": "test@test.com",
>    "subject": "test",
>    "html": "test"
>  }'
> ```

## Setup

### Environment

Your worker must have the following environment variables.

```bash
echo $AWS_REGION | npx wrangler secret put AWS_REGION
echo $AWS_ACCESS_KEY_ID | npx wrangler secret put AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY | npx wrangler secret put AWS_SECRET_ACCESS_KEY
```

### Authentication

Optionally, you may secure your endpoint by setting the following environment variable.

```bash
echo $AUTH_TOKEN | npx wrangler secret put AUTH_TOKEN
```

## Verify Email

To use any sender email, the email must first be verified. The verification will require the following environment variables. You may populate your environment with the following.

```bash
{
  echo "AWS_REGION=$AWS_REGION"
  echo "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID"
  echo "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY"
} >> .env
```

Now, pipe your email to the `verify-email` script.

```bash
echo $EMAIL_ADDRESS | bun verify-email
```
