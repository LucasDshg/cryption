export interface ICorretora {
  tenantId: string;
  email: string;
  password: string;
  recaptchaToken: string;
  cookie: string;
}

export interface IBot {
  email: string;
  password: string;
  tenantId: string;
}

export interface IUser {
  id?: string;
  corretora: string;
  bot: string;
  robo: {
    id: string;
    loginId: string;
    tenantId: string;
  };
}
