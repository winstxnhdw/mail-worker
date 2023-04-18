import { verify_mail_request } from '@/get_mail_request'
import { MailRequest } from '@/types/mail_request.js'
import { expect } from 'chai'
import 'mocha'

describe('get_mail_request', () => {
  it('It should return `undefined` if `to` is not an array', async () => {
    const mail_request = {
      to: 'test@email.com',
      from: 'test@email.com',
      subject: '',
      html: ''
    } as unknown as MailRequest

    const parsed_mail_request = await verify_mail_request(mail_request)
    expect(parsed_mail_request).to.be.undefined
  })

  it('It should not return `undefined` if `to` is an array', async () => {
    const mail_request = {
      to: ['test@email.com'],
      from: 'test@email.com',
      subject: '',
      html: ''
    } as MailRequest

    const parsed_mail_request = await verify_mail_request(mail_request)
    expect(parsed_mail_request).to.not.be.undefined
  })

  it('It should return `undefined` if `to` is an empty array', async () => {
    const mail_request = {
      to: [],
      from: 'test@email.com',
      subject: '',
      html: ''
    } as MailRequest

    const parsed_mail_request = await verify_mail_request(mail_request)
    expect(parsed_mail_request).to.be.undefined
  })
})
