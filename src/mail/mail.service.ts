import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class GmailMailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendUserConfirmation(email: string, nom: string) {
    const msg = {
      to: email,
      from: 'Support <votre-email@gmail.com>',
      subject: 'Votre candidature a été reçue',
      text: `Bonjour ${nom}, votre candidature a été reçue.`,
    };

    try {
      await this.transporter.sendMail(msg);
      console.log('Email envoyé avec succès');
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error.message);
    }
  }
}
