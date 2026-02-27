import { WEBSITE_URL } from '@/src/utils/config';

export function resetPasswordTemplate({ url, user }) {
   const locale = url.includes('/sr/') ? 'sr' : 'en';
   const imageUrl = `${WEBSITE_URL}/${locale}/email-logo.png`;

   const content = {
      en: {
         subject: 'Reset your password',
         name: 'Hi',
         body: 'Click the button below to reset your password.',
         expires: 'This link expires in 1 hour.',
         button: 'Reset',
         footer:
            "If you didn't request this, you can safely ignore this email.",
      },
      sr: {
         subject: 'Ресетујте лозинку',
         name: 'Здраво',
         body: 'Кликните дугме испод да ресетујете лозинку.',
         expires: 'Овај линк истиче за 1 сат.',
         button: 'Ресетуј',
         footer: 'Ако нисте тражили ово, можете игнорисати овај мејл.',
      },
   }[locale];

   return `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${content.subject}</title>
    <style>
      @media only screen and (max-width: 600px) {
        body {
          background-color: transparent !important;
        }
        table[role="presentation"] {
          background-color: transparent !important;
          padding: 0px 0px !important;
        }
      }
    </style>
  </head>
  <body style="margin:0; padding:100px 0; background-color:#f4f5f6; font-family: Helvetica, Arial, sans-serif;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background:#fff; border:1px solid #eaebed; border-radius:16px; box-shadow: 0 0 40px rgba(229, 231, 235, 1); padding:40px 50px;">

            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src=${imageUrl} alt="Logo" width="90" style="display:block; border:0;" />
              </td>
            </tr>

            <tr>
              <td align="center" style="font-weight:600; color:#374151; font-size:24px; padding-bottom:18px;">
                ${content.subject}
              </td>
            </tr>

            <tr>
              <td>
                <hr style="border:none; border-top:1px solid #6b7280; opacity:0.2; margin: 0 0 18px 0;" />
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:16px; color:#1f2937; line-height:1.3; padding-bottom:6px;">
                ${content.name} ${user.name.split(' ')[0].slice(0, 10) ?? user.email},
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:16px; color:#1f2937; line-height:1.3; padding-bottom:6px;">
                ${content.body}
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:16px; color:#1f2937; line-height:1.3; padding-bottom:22px;">
                ${content.expires}
              </td>
            </tr>

            <tr>
              <td align="center">
                <a href="${url}"
                   style="
                     background-color: #ddc2a2;
                     color: #fff;
                     text-decoration: none;
                     font-weight: 600;
                     font-size: 18px;
                     padding: 10px 28px;
                     border-radius: 50px;
                     display: inline-block;
                     box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
                     border: 2px solid transparent;
                   "
                >
                  ${content.button}
                </a>
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:13px; color:#9ca3af; padding-top:24px;">
                ${content.footer}
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
</html>`;
}
