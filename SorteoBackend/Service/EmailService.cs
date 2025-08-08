// Services/EmailService.cs
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 587,
            Credentials = new NetworkCredential(
                _configuration["EmailSettings:From"],
                _configuration["EmailSettings:AppPassword"]
            ),
            EnableSsl = true,
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(_configuration["EmailSettings:From"]),
            Subject = subject,
            Body = body,
            IsBodyHtml = false,
        };

        mailMessage.To.Add(to);

        await smtpClient.SendMailAsync(mailMessage);
    }

    public async Task EnviarCorreoCambioEstado(string destinatario, string nuevoEstado)
    {
        string asunto = $"Estado de tu inscripción: {nuevoEstado}";
        string mensaje = nuevoEstado switch
        {
            "Aceptada" => "¡Felicidades! Tu inscripción ha sido aceptada. 🎉",
            "Rechazada" => "Gracias por tu interés de  participar. Lamentablemente, tu inscripción ha sido rechazada.",
            _ => $"Tu inscripción ha cambiado de estado a: {nuevoEstado}"
        };

        await SendEmailAsync(destinatario, asunto, mensaje);
    }
}
