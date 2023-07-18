package ensa.pfa.kitcoop.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    private String getHtmlContent(String fileName, String verificationToken) throws IOException {
        ClassPathResource resource = new ClassPathResource(fileName);
        byte[] fileBytes = FileCopyUtils.copyToByteArray(resource.getInputStream());
        String htmlContent = new String(fileBytes, "utf-8");
        return htmlContent.replace("__TOKEN__", verificationToken);
    }

    public void sendVerificationEmail(String to, String verificationToken) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject("KitCoop - Verify your email address");
        try {
            String htmlContent = getHtmlContent("EmailStructure.html", verificationToken);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (IOException e) {
            // Handle the exception
        }        javaMailSender.send(message);
    }
}
