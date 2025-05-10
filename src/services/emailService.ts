
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const sendContactForm = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Initialize EmailJS with your user ID
    emailjs.init("-aJpdb1kHyn4pDxSn"); // Replace with your actual User ID
    
    const result = await emailjs.send(
      "Portfolio", // Replace with your actual Service ID
      "template_cgn1e4k", // Replace with your actual Template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'aadijainadj@gmail.com', // Your email where you want to receive messages
      }
    );

    console.log("Email sent successfully:", result.text);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
