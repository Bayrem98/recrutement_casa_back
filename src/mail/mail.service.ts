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

  async sendUserConfirmation(email: string, nom: string, prenom: string) {
    if (!email) {
      throw new Error('No recipients defined');
    }
    const msg = {
      to: email,
      from: 'Société ASTRAGALE & ULYSSE <votre-email@gmail.com>',
      subject: 'Votre candidature',
      text: `Bonjour ${nom} ${prenom}
      
      Votre candidature a été reçue avec succès.

      Nous allons traiter votre demande et vous 
      contacter sous peu.

      Merci de votre confiance`,
    };

    try {
      await this.transporter.sendMail(msg);
      console.log('Votre Candidature a été reçue, Voir ta boite mail. Merci');
      console.log('Email envoyé avec succès');
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error.message);
    }
  }
}
