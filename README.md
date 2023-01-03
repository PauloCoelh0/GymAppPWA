# PWA_Ginasio_ESTG

-----  Scopes  -----

 Normal / Vip / Gestor

- Normal: Acesso às máquinas do ginásio
- Vip: Acesso às máquinas e serviços especiais como Sauna, Jacuzzi, Banho Turco, etc...
- Gestor: Controla os users Normais/Vip. Cria/apaga aulas no ginásio

-----  Preços  -----

- Preço para pertencentes à ESTG é reduzido
- Preço para não pertencentes à ESTG é maior

-----  Entrada  -----

- A entrada no ginásio é feita com a leitura de QRCodes, caso não disponha do telemovel pode aceder através do email e password (por exemplo)

-----  Aulas  -----

- Vip podem visualizar aulas e marcar presença (se houver vaga)

-----  Notificações  -----

- Utilizadores devem ser notificados quando é criada uma nova aula, e sempre que o gestor deixa uma mensagem

-----  Feed  -----

- Um feed que mostra as mensagens dos gestores

-----  Registo  -----

- Feito online pelo proprio utilizador, opção vip deve ser validada pelo Gestor
- Registo com upload de fotos

-----  Login  -----

- Gestão da sessão (Expiração e Logout)
- Gerir acessos à página Admin
- Login com QRCode

-----  Zona Utilizador  -----

- Mostrar QRCode para efetuar login
- Numero de mensagens e aulas (total e registadas) logo no header
- Visualizar o calendário das aulas por dia e inscrição nas mesmas
- Pesquisa simples por nome ou tipo de aula (acho eu)

-----  Zona Gestor  -----

- Listagem das aulas 
- Formulário de edição
- Upload de imagens ou documentos para os itens (Aulas)

-----  Main Page  -----

- Tabelas com preços
- Contagem do número de utilizadores dentro do ginásio (em tempo real)

-----  Routes  -----

Utilizadores 

- POST - CreateUsers - Gestor / Normal / Vip
- POST - Login - Gestor / Normal / Vip
- GET - FindAllUsers - Gestor
- GET - FindUserById - Gestor
- PUT - UpdateUserById - Gestor
- GET - GetUserPerfil - Gestor / Normal / Vip
- GET - Logout - Gestor / Normal / Vip

Aulas

- POST - CreateAulas - Gestor
- GET - FindAllAulas - Gestor / Vip / Normal
- GET - FindAulaById - Gestor / Vip
- PUT - UpdateAulaById - Gestor
- DELETE - DeleteAulaById - Gestor  -- Ver depois

Ginasio

- POST - CreateSector - Gestor
- GET - FindAllSector - Gestor / Vip / Normal
- GET - FindSectorById - Gestor / Vip / Normal
- PUT - UpdateSectorById - Gestor
- DELETE - DeleteSectorById - Gestor -- Ver depois



-----  Testes  -----

- Deverão existir testes pelo menos para toda a área de utilizador
