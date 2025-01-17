import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(email: string, nom: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Votre candidature a été reçue',
        template: './confirmation', // Fichier Handlebars : confirmation.hbs
        context: {
          nom, // Variable injectée dans le template
        },
      });
      console.log('Email envoyé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error.message);
    }
  }
}
