export interface IUser {
  corretora: {
    tenantId: string;
    email: string;
    password: string;
    recaptchaToken: string;
    cookie: string;
  };
  bot: {
    email: string;
    password: string;
    tenantId: string;
  };
}
