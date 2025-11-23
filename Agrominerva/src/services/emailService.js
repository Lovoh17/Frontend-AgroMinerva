// emailService.js - Configurado para AgroMinerva
import emailjs from '@emailjs/browser';

// Inicializar EmailJS con Public Key
emailjs.init('R7KazkH30l4us7cll');

export const emailService = {
  /**
   * Enviar correo de contacto usando EmailJS
   * @param {Object} contactData - Datos del formulario
   */
  async sendContactEmail(contactData) {
    try {
      // Preparar los parámetros para la plantilla de EmailJS
      const templateParams = {
        // Datos del remitente
        from_name: contactData.name,
        from_email: contactData.email,
        phone: contactData.phone || 'No proporcionado',
        subject: this.getSubjectLabel(contactData.subject),
        subject_value: contactData.subject,
        message: contactData.message,
        
        // Información adicional
        date: new Date().toLocaleString('es-SV', {
          dateStyle: 'full',
          timeStyle: 'short'
        }),
        priority: this.getPriority(contactData.subject),
        priority_emoji: this.getPriorityEmoji(contactData.subject),
        
        // Para el correo de respuesta
        reply_to: contactData.email,
        
        // Datos institucionales
        institution: 'AgroMinerva - Facultad Multidisciplinaria Oriental',
        institution_full: 'Universidad de El Salvador',
        address: 'Cantón El Jícaro, Apopa, San Salvador',
        phone_contact: '(+503) 2278-0000',
        email_contact: 'agrominerva.fmo@ues.edu.sv'
      };

      // Enviar el email usando EmailJS con IDs específicos
      const response = await emailjs.send(
        'service_jkwcqfm',      //  Service ID
        'template_j9glama',     //  Template ID
        templateParams
      );

      console.log('Correo enviado exitosamente:', response);
      
      return {
        success: true,
        message: 'Correo enviado exitosamente',
        status: response.status
      };

    } catch (error) {
      console.error('Error enviando correo:', error);
      
      throw {
        success: false,
        message: 'No se pudo enviar el correo. Por favor intenta nuevamente.',
        error: error.text || error.message
      };
    }
  },

  /**
   * Obtener la etiqueta legible del asunto
   */
  getSubjectLabel(subjectValue) {
    const subjects = {
      'programas': 'Información sobre programas',
      'inscripciones': 'Inscripciones',
      'productos': 'Consulta sobre productos',
      'visitas': 'Visitas guiadas',
      'colaboraciones': 'Colaboraciones',
      'otro': 'Otro'
    };
    return subjects[subjectValue] || 'Sin asunto';
  },

  /**
   * Obtener el nivel de prioridad
   */
  getPriority(subjectValue) {
    const priorities = {
      'inscripciones': 'Alta',
      'colaboraciones': 'Alta',
      'visitas': 'Media',
      'programas': 'Media',
      'productos': 'Normal',
      'otro': 'Normal'
    };
    return priorities[subjectValue] || 'Normal';
  },

  /**
   * Obtener emoji de prioridad
   */
  getPriorityEmoji(subjectValue) {
    const emojis = {
      'inscripciones': '⭐⭐⭐',
      'colaboraciones': '⭐⭐⭐',
      'visitas': '⭐⭐',
      'programas': '⭐⭐',
      'productos': '⭐',
      'otro': '⭐'
    };
    return emojis[subjectValue] || '⭐';
  }
};