// newsletterService.js - Servicio para Newsletter de AgroMinerva
import emailjs from '@emailjs/browser';

// Inicializar EmailJS con Public Key
emailjs.init('R7KazkH30l4us7cll');

export const newsletterService = {
  /**
   * Suscribir usuario al newsletter
   * @param {string} email - Email del suscriptor
   */
  async subscribeToNewsletter(email) {
    try {
      // Preparar los parámetros para la plantilla de EmailJS
      // ⚠️ IMPORTANTE: Los nombres deben coincidir EXACTAMENTE con los del template
      const templateParams = {
        // ✅ CORREGIDO: Usar "email" en lugar de "to_email" 
        // porque en el template de EmailJS tienes {{email}} en "To Email"
        email: email,
        
        // Datos para el contenido del email
        subscriber_email: email,
        to_name: email.split('@')[0],
        
        // Fecha de suscripción
        subscription_date: new Date().toLocaleDateString('es-SV', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        
        // Datos institucionales (si los usas en el template)
        reply_to: 'agrominervafmo@gmail.com'
      };

      console.log('Enviando newsletter a:', email);
      console.log('Parámetros:', templateParams);

      // Enviar el email de bienvenida usando EmailJS
      const response = await emailjs.send(
        'service_jkwcqfm',      // Service ID
        'template_kuo5jwp',     // Template ID del Newsletter
        templateParams
      );

      console.log('Newsletter suscrito exitosamente:', response);
      
      return {
        success: true,
        message: 'Suscripción exitosa al newsletter',
        status: response.status
      };

    } catch (error) {
      console.error('Error al suscribir al newsletter:', error);
      
      throw {
        success: false,
        message: error.text || 'No se pudo completar la suscripción. Por favor intenta nuevamente.',
        error: error.text || error.message
      };
    }
  },

  /**
   * Validar formato de email
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};