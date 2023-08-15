import { verify_mail_request } from '@/get_mail_request'
import { MailRequest } from '@/types'
import { expect, test } from 'bun:test'

test('It should return `undefined` if `to` is not an array', () => {
  const mail_request = {
    to: 'test@email.com',
    from: 'test@email.com',
    subject: '',
    html: ''
  } as unknown as MailRequest

  const parsed_mail_request = verify_mail_request(mail_request)
  expect(parsed_mail_request).toBeUndefined()
})

test('It should not return `undefined` if `to` is an array', () => {
  const mail_request = {
    to: ['test@email.com'],
    from: 'test@email.com',
    subject: '',
    html: ''
  } as MailRequest

  const parsed_mail_request = verify_mail_request(mail_request)
  expect(parsed_mail_request).not.toBeUndefined()
})

test('It should return `undefined` if `to` is an empty array', () => {
  const mail_request = {
    to: [],
    from: 'test@email.com',
    subject: '',
    html: ''
  } as MailRequest

  const parsed_mail_request = verify_mail_request(mail_request)
  expect(parsed_mail_request).toBeUndefined()
})
