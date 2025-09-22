export interface IMe {
  id: string;
  loginId: string;
  tenantId: string;
  name: string;
  email: string;
  active: boolean;
  emailVerified: boolean;
  telegram: [
    {
      chatId: number;
      username: string;
    },
  ];
}
