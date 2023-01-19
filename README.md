# Calculadora de tinta necessária para pintar quatro paredes

Seguindo as especificações e recomendações de https://gitlab.com/digitalrepublic/code-challenge

## Sobre a solução

Utilizei uma estrutura de pastas onde o domínio que estava trabalhando possuí uma pasta onde todos os arquivos apenas relevantes pra esse domínio se encontram.
Nesse caso, acabei isolando só um component pra fora da pastas (dentro de `src/components/`) em demonstração em como eu estruturia uma pasta de components genéricos para serem utilizados dentro de todo sistema.

Uma decisão meio peculiar que tomei foi utilizar o JSDocs junto com uma configuração do vscode para verificar os tipos, algo que não tinha feito antes. Acabei optando por isso para aprender como é desenvolver com tipos, mas sem ter que instalar todas as bibliotecas do typescript para um projeto relativamente simples como esse. Não acho que seja uma das melhores soluções, principalmente quando trabalhando com React, ter que tipar com typescript os `useState` hooks fica bem poluído.

Por último, o que eu gostaria de ter feito, mas não fiz por falta de tempo:
  - Separar as classes do arquivo `App.css` em outros arquivos `.css` mais perto de onde são utilizadas
  - Adicionar testes com o `react-testing-library`
  - Melhorar a interface no geral, uma ideia que eu tive era adicionar um botão do lado do título de cada grupo de inputs para poder copiar os valores digitados anteriormente ('Copiar valores da última parede')
  - Destacar os input fields com erros. Aqui eu optei por fazer uma solução "na unha" pra evitar ter que escolher uma lib pro exercício, mas o ideal seria usar uma biblioteca pra fazer o controle e mostrar o erro logo depois do usuário digital o valor, e não só quando o usuário abertar no botão pra gerar o resultado.
  - Melhorar a responsividade, acabei só colocando duas ideias na metade, tela de celular e uma tela grande, podia ter um meio termo e melhorar a disposição dos elementos do `Header` 


## Como rodar

Clonar o projeto e rodar os comandos na seguinte ordem:

1 - `yarn` ou `npm install`

2 - `yarn start` ou `npm run start`