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

export interface IAuth {
  id?: string;
  tokenCorretora: string;
  tokenBot: string;
  credential: {
    corretora: ICorretora;
    robo: IBot;
  };
  robo: {
    id: string;
    loginId: string;
    tenantId: string;
  };
}
