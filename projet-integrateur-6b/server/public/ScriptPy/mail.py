import smtplib
import sys
import base64
import io
from PIL import Image
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

if len (sys.argv) != 4:
    print("Usage: python mail.py arg1")
    sys.exit(1)

smtp_server = "smtp.gmail.com"
smtp_port = 587 

smtp_login = "round.coders@gmail.com"
to_email = sys.argv[1]
auth_code = "ecujnyocilfwujtk"

msg = MIMEMultipart ()
msg['From'] = smtp_login
msg['To'] = to_email
msg['Subject'] = sys.argv[2]
body = sys.argv[3]

msg.attach(MIMEText(body, 'plain'))


# Add signature to the message
with open('./public/ScriptPy/logo.png', 'rb') as f:
    img_data = f.read()
    f.seek(0)  # Remettre le curseur à la position de départ pour éviter l'erreur 'ValueError: seek of closed file'

    # Resize the image to a maximum width of 200 pixels
    img = Image.open(f)
    max_width = 200
    width, height = img.size
    if width > max_width:
        ratio = max_width / width
        img = img.resize((max_width, int(height * ratio)), Image.ANTIALIAS)

    # Add the image to the email as an attachment
    img_byte_array = io.BytesIO()
    img.save(img_byte_array, format='PNG')
    img_byte_array = img_byte_array.getvalue()
    img_mime = MIMEImage(img_byte_array, name='logo.png')
    img_mime.add_header('Content-ID', '<logo>')
    img_mime.add_header('Content-Disposition', 'inline', filename='logo.png')
    msg.attach(img_mime)

# Add the signature with the resized image to the email body
signature = """<br>
-- <br>
Bien à vous,<br>
<br>
Equipe RoundCoders<br>
round.coders@gmail.com<br>
Université de Strasbourg<br>
UFR Mathématique et Informatique<br>
Licence Informatique<br>
L3-S6 Equipe 6B"""
signature += f'<br><img src="cid:logo" alt="logo" style="display:block; max-width:{max_width}px;">'
msg.attach(MIMEText(signature, 'html'))
#Fin Add signature to the message


with smtplib.SMTP(smtp_server, smtp_port) as server:
    server.starttls()
    server.login(smtp_login, auth_code, initial_response_ok=False)
    server.docmd("AUTH", "XOAUTH2" + auth_code)

    server.sendmail(smtp_login, to_email, msg.as_string())
    print ("Message envoyé à " + to_email)
