'use strict';

import User from 'App/Models/User';
import Env from '@ioc:Adonis/Core/Env';

const nodemailer = require('nodemailer');

async function sendEmail(user: User) {

    let response = false;

    const text = `Hello ${user.name}, how are you? As requested, a temporary password is shown below, but a folder can be changed to access your Profile.`;

    const transporter = nodemailer.createTransport({
        host: Env.get('DB_EMAIL_SMTP', '') as string,
        port: Number(Env.get('DB_EMAIL_PORT', 587)),
        secure: Env.get('DB_EMAIL_SECURE', false),
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: Env.get('DB_EMAIL_USER', '') as string,
            pass: Env.get('DB_EMAIL_PASSWORD', '') as string,
        },
    });

    const mailOptions = {
        from: `Evolution Sistemas | Media Indoor <${Env.get('DB_EMAIL_USER', '') as string}>`,
        to: user.email,
        subject: 'Reset Password',
        // text: user.password,
        html:`
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns:th="http://www.thymeleaf.org" xmlns="http://www.w3.org/1999/xhtml" style="padding: 0px; margin: 0px;" lang="pt_br">
<head>
  <title>Evolution Sistemas | Media Indoor</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!--     Fonts and icons     -->
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" />
  <style>
    body {
      margin: 0;
      padding: 0;
	  background: #f2f2f2;
    }
    @media only screen and (max-width:640px) {
      table,
      img[class="partial-image"] {
        width: 100% !important;
        height: auto !important;
        min-width: 200px !important;
      }
  </style>
</head>
<body>
  <table style="border-collapse: collapse; border-spacing:0; min-height: 418px;" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f2f2f2">
    <tbody>
      <tr>
        <td align="center" style="border-collapse: collapse; padding-top: 30px; padding-bottom: 30px;">
          <table cellpadding="5" cellspacing="5" width="600" bgcolor="white" style="border-collapse: collapse; border-spacing: 0;">
            <tbody>
              <tr>
                <td style="border-collapse: collapse; padding: 0px; text-align: center; width: 600px;">
                  <table style="border-collapse: collapse; border-spacing: 0; box-sizing: border-box; min-height: 40px; position: relative; width: 100%;">
                    <tbody>
                      <tr>
                        <td style="border-collapse: collapse; font-family: Arial; padding: 10px 15px; background-color: #3F51B5">
                          <table width="100%" style="border-collapse: collapse; border-spacing: 0; font-family: Arial;">
                            <tbody>
                              <tr>
                                <td>
                                  <img src="https://evolutionsistemas.com.br/assets/images/logoEvolution.png"></img>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td style="border-collapse: collapse; font-family: Arial; padding: 10px 15px; background: #fff;">
                          <table width="100%" style="border-collapse: collapse; border-spacing: 0; font-family: Arial;">
                            <tbody>
                              <tr>
                                <td style="border-collapse: collapse;">
                                  <h2>
                                    <a style="display: inline-block; text-decoration: none; box-sizing: border-box; font-family: arial; width: 100%; text-align: center; color: rgb(102,102,102); font-size: 16px; cursor: text;" target="_blank">
                                      <span style="font-weight: normal; color: #666;">
                                      ${text}
                                      </span>
                                    </a>
                                  </h2>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style="border-collapse: collapse; border-spacing: 0; box-sizing: border-box; min-height: 40px; position: relative; width: 100%; font-family: Arial; font-size: 25px; padding-bottom: 20px; padding-top: 20px; text-align: center; vertical-align: middle;">
                    <tbody>
                      <tr>
                        <td style="border-collapse: collapse; font-family: Arial; padding: 5px 5px;">
                          <table width="100%" style="border-collapse: collapse; border-spacing: 0; font-family: Arial;">
                            <tbody>
                              <tr>
                                <td style="border-collapse: collapse;">
                                  <h2 style="font-weight: normal; margin: 0px; padding: 0px; color: #666; word-wrap: break-word;">
                                    <a style="display: inline-block; text-decoration: none; box-sizing: border-box; font-family: arial; width: 100%; font-size: 25px; text-align: center; word-wrap: break-word; color: rgb(102,102,102);" target="_blank">
                                      <span style="font-size: inherit; text-align: center; width: 100%; color: #666;">Password recovery!
                                      </span>
                                    </a>
                                  </h2>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style="border-collapse: collapse; border-spacing: 0; box-sizing: border-box; min-height: 40px; position: relative; width: 100%;">
                    <tbody>
                      <tr>
                        <td style="border-collapse: collapse; font-family: Arial; padding: 5px 5px;">
                          <table width="100%" style="border-collapse: collapse; border-spacing: 0; text-align: left; font-family: Arial;">
                            <tbody>
                              <tr>
                                <td style="border-collapse: collapse;">
                                  <div style="font-family: Arial; font-size: 15px; font-weight: normal; line-height: 170%; text-align: left; color: #666; word-wrap: break-word;">
                                    <div style="text-align: center;">
                                      <br/>
                                    </div>
                                    <div style="text-align: center;">
                                      <p>Your user is ${user.email}.</p>
                                      <p>Your temporary password is ${user.password}.</p>
                                      <span style="line-height: 0; display: none;"></span>
                                      <span style="line-height: 0; display: none;"></span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style="border-collapse: collapse; border-spacing: 0; box-sizing: border-box; min-height: 40px; position: relative; width: 100%; padding-bottom: 10px; padding-top: 10px;">
                  </table>
                  <table style="border-collapse: collapse; border-spacing: 0; box-sizing: border-box; min-height: 40px; position: relative; width: 100%; display: table;">
                    <tbody>
                      <tr>
                        <td style="border-collapse: collapse; font-family: Arial; padding: 10px 15px;">
                          <table width="100%" style="border-collapse: collapse; border-spacing: 0; font-family: Arial;">
                            <tbody>
                              <tr>
                                <td style="border-collapse: collapse;">
                                  <hr style="border-color: #3F51B5; border-style: dashed;"></hr>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style="border-collapse: collapse; border-spacing: 0; box-sizing: border-box;  min-height: 40px; position: relative; width: 100%;">
                    <tbody>
                      <tr>
                        <td style="border-collapse: collapse; font-family: Arial; padding: 10px 15px; background-color: #3F51B5;">
                          <table width="100%" style="border-collapse: collapse; border-spacing: 0; text-align: left; font-family: Arial;">
                            <tbody>
                              <tr>
                                <td style="border-collapse: collapse;">
                                  <div style="font-family: Arial; font-size: 15px; font-weight: normal; line-height: 170%; text-align: left; color: rgb(120,113,99); word-wrap: break-word;">
                                    <div style="text-align: center; color: rgb(255,255,255);">Eder Aparecido Leite - Developer Delphi/Java/JavaScript
                                    </div>
                                    <a style="text-align: center;display:block; color: rgb(255,255,255);">(44)99997-3923 - eder@evolutionsistemas.com.br
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style="border-collapse: collapse; border-spacing: 0; box-sizing: border-box;  min-height: 40px; position: relative; width: 100%;">
                    <tbody>
                      <tr>
                        <td style="border-collapse: collapse; font-family: Arial; padding: 10px 15px;">
                          <table width="100%" style="border-collapse: collapse; border-spacing: 0; font-family: Arial;">
                            <tbody>
                              <tr>
                                <td style="border-collapse: collapse;">
                                  <hr style="border-color: #3F51B5; border-style: dashed;"></hr>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>`};

    await transporter.sendMail(mailOptions)
        .then((e) => {
            console.log(e);
            response = true;
        })
        .catch((e) => {
            console.log(e);
            response = false;
        });

    return response;
}

function generatePassword() {
    var pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';
    var pwdLen = 8;
    var randPassword = Array(pwdLen).fill(pwdChars).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return randPassword;
};


export async function resetPassword(data: User) {
    try {
        const user = await User.findOrFail(data.id);
        const password = generatePassword();
        data.password = password;
        await user.merge(data);

        if (await sendEmail(user)) {
            await user.save();
            return true;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}
