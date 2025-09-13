export const FIREBASE_ERROS = [
  {
    code: 'auth/claims-too-large',
    message:
      'O payload de declarações fornecido para setCustomUserClaims() excede o tamanho máximo permitido de 1.000 bytes.',
  },
  {
    code: 'auth/email-already-exists',
    message:
      'O e-mail fornecido já está em uso por outro usuário. Cada usuário precisa ter um e-mail exclusivo.',
  },
  {
    code: 'auth/id-token-expired',
    message: 'O token de código do Firebase provisionado expirou.',
  },
  {
    code: 'auth/id-token-revoked',
    message: 'O token de ID do Firebase foi revogado.',
  },
  {
    code: 'auth/insufficient-permission',
    message:
      'A credencial usada para inicializar o SDK Admin não tem permissão para acessar o recurso solicitado do Authentication. Consulte Configurar um projeto do Firebase para ver a documentação sobre como gerar uma credencial com as permissões apropriadas e usá-la na autenticação dos SDKs Admin.',
  },
  {
    code: 'auth/internal-error',
    message:
      '	O servidor do Authentication encontrou um erro inesperado ao tentar processar a solicitação. A mensagem de erro incluirá a resposta do servidor de autenticação com informações adicionais. Se o erro persistir, informe o problema ao nosso canal de suporte de Relatório do bug.',
  },
  {
    code: 'auth/invalid-argument',
    message:
      'Um argumento inválido foi fornecido a um método do Authentication. A mensagem de erro precisa conter informações adicionais.',
  },
  {
    code: 'auth/invalid-claims',
    message:
      'Os atributos de declaração personalizados fornecidos para setCustomUserClaims() são inválidos.',
  },
  {
    code: 'auth/invalid-continue-uri',
    message: 'O URL de confirmação precisa ser uma string de URL válida.',
  },
  {
    code: 'auth/invalid-creation-time',
    message: 'O horário da criação precisa ser um string de data UTC válido.',
  },
  {
    code: 'auth/invalid-credential',
    message: 'Senha incorreta!',
  },
  {
    code: 'auth/invalid-disabled-field',
    message:
      'O valor fornecido para a propriedade do usuário disabled é inválido. Precisa ser um valor booleano.',
  },
  {
    code: 'auth/invalid-display-name',
    message:
      'O valor fornecido para a propriedade do usuário displayName é inválido. Precisa ser uma string não vazia.',
  },
  {
    code: 'auth/invalid-dynamic-link-domain',
    message:
      'O domínio de link dinâmico fornecido não está configurado ou autorizado para o projeto atual.',
  },
  {
    code: 'auth/invalid-email',
    message:
      'O valor fornecido para a propriedade do usuário email é inválido. Precisa ser um endereço de e-mail de string.',
  },
  {
    code: 'auth/invalid-email-verified',
    message:
      'O valor fornecido para a propriedade do usuário emailVerified é inválido. Precisa ser um valor booleano.',
  },
  {
    code: 'auth/invalid-hash-algorithm',
    message:
      'O algoritmo de hash precisa corresponder a uma das strings na lista de algoritmos compatíveis.',
  },
  {
    code: 'auth/invalid-hash-block-size',
    message: 'O tamanho do bloco de hash precisa ser um número válido.',
  },
  {
    code: 'auth/invalid-hash-derived-key-length',
    message:
      'O tamanho da chave derivada do hash precisa ser um número válido.',
  },
  {
    code: 'auth/invalid-hash-key',
    message: 'A chave de hash precisa ter um buffer de byte válido.',
  },
  {
    code: 'auth/invalid-hash-memory-cost',
    message: 'O custo da memória hash precisa ser um número válido.',
  },
  {
    code: 'auth/invalid-hash-parallelization',
    message: 'O carregamento em paralelo do hash precisa ser um número válido.',
  },
  {
    code: 'auth/invalid-hash-rounds',
    message: 'O arredondamento de hash precisa ser um número válido.',
  },
  {
    code: 'auth/invalid-hash-salt-separator',
    message:
      'O campo do separador de salt do algoritmo de geração de hash precisa ser um buffer de byte válido.',
  },
  {
    code: 'auth/invalid-id-token',
    message:
      'O token de código informado não é um token de código do Firebase válido.',
  },
  {
    code: 'auth/invalid-last-sign-in-time',
    message:
      'O último horário de login precisa ser um string de data UTC válido.',
  },
  {
    code: 'auth/invalid-page-token',
    message:
      'O token de próxima página fornecido em listUsers() é inválido. Precisa ser uma string não vazia válida.',
  },
  {
    code: 'auth/invalid-password',
    message:
      'O valor fornecido para a propriedade do usuário password é inválido. Precisa ser uma string com pelo menos seis caracteres.',
  },
  {
    code: 'auth/invalid-password-hash',
    message: 'O hash da senha precisa ser um buffer de byte válido.',
  },
  {
    conde: 'invalid-password-salt',
    message: 'O salt da senha precisa ser um buffer de byte válido',
  },
  {
    code: 'auth/invalid-phone-number',
    message:
      'O valor fornecido para phoneNumber é inválido. Ele precisa ser uma string de identificador compatível com o padrão E.164 não vazio.',
  },
  {
    code: 'auth/invalid-photo-url',
    message:
      'O valor fornecido para a propriedade do usuário photoURL é inválido. Precisa ser um URL de string.',
  },
  {
    code: 'auth/invalid-provider-data',
    message:
      'O providerData precisa ser uma matriz válida de objetos UserInfo.',
  },
  {
    code: 'auth/invalid-provider-id',
    message:
      'O providerId precisa ser um string de identificador de provedor compatível válido.',
  },
  {
    code: 'auth/invalid-oauth-responsetype',
    message:
      'Apenas um responseType do OAuth deve ser definido como verdadeiro.',
  },
  {
    code: 'auth/invalid-session-cookie-duration',
    message:
      'A duração do cookie da sessão precisa ser um número válido em milissegundos entre 5 minutos e 2 semanas.',
  },
  {
    code: 'auth/invalid-uid',
    message:
      'O uid fornecido precisa ser uma string não vazia com no máximo 128 caracteres.',
  },
  {
    code: 'auth/invalid-user-import',
    message: 'O registro do usuário a ser importado é inválido.',
  },
  {
    code: 'auth/maximum-user-count-exceeded',
    message:
      'O número máximo permitido de usuários a serem importados foi excedido.',
  },
  {
    code: 'auth/missing-android-pkg-name',
    message:
      'Um nome de pacote Android precisa ser fornecido para a instalação do app Android.',
  },
  {
    code: 'auth/missing-continue-uri',
    message:
      'Um URL de confirmação válido precisa ser fornecido na solicitação.',
  },
  {
    code: 'auth/missing-hash-algorithm',
    message:
      'É necessário fornecer o algoritmo de geração de hash e seus parâmetros para importar usuários com hashes de senha.',
  },
  {
    code: 'auth/missing-ios-bundle-id',
    message: 'A solicitação não tem um ID do pacote.',
  },
  {
    code: 'auth/missing-uid',
    message: 'Um identificador uid é necessário para a operação atual.',
  },
  {
    code: 'auth/missing-oauth-client-secret',
    message:
      'A chave secreta do cliente de configuração do OAuth é necessária para ativar o fluxo de código do OIDC.',
  },
  {
    code: 'auth/operation-not-allowed',
    message:
      'O provedor de login fornecido está desativado para o projeto do Firebase. Ative-o na seção Método de login do Console do Firebase.',
  },
  {
    code: 'auth/phone-number-already-exists',
    message:
      'O phoneNumber fornecido já está sendo usado por um usuário existente. É necessário que cada usuário tenha um phoneNumber exclusivo.',
  },
  {
    code: 'auth/project-not-found',
    message:
      'Nenhum projeto do Firebase foi encontrado com a credencial usada para inicializar os Admin SDKs. Consulte Configurar um projeto do Firebase para ver a documentação sobre como gerar uma credencial para seu projeto e usá-la na autenticação dos Admin SDKs.',
  },
  {
    code: 'auth/reserved-claims',
    message:
      'Uma ou mais declarações de usuário personalizadas fornecidas para setCustomUserClaims() são reservadas. Por exemplo, não use as declarações específicas do OIDC, como sub, iat, iss, exp, aud, auth_time etc., como chaves para declarações personalizadas.',
  },
  {
    code: 'auth/session-cookie-expired',
    message: 'O cookie da sessão do Firebase fornecido expirou.',
  },
  {
    code: 'auth/session-cookie-revoked',
    message: '	O cookie da sessão do Firebase foi revogado.',
  },
  {
    code: 'auth/too-many-requests',
    message: 'O número de solicitações excede o máximo permitido.',
  },
  {
    code: 'auth/uid-already-exists',
    message:
      '	O uid fornecido já está sendo usado por um usuário existente. É necessário que cada usuário tenha um uid exclusivo.',
  },
  {
    code: 'auth/unauthorized-continue-uri',
    message:
      'O domínio da URL de confirmação não está na lista de permissões. Acesse o Console do Firebase para colocar o domínio na lista de auth/user-not-found',
  },
];
