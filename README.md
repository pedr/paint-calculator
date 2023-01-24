# Calculadora de tinta necessária para pintar quatro paredes

Seguindo as especificações e recomendações de https://gitlab.com/digitalrepublic/code-challenge

# Calculator to discover how much paint is necessary to paint the walls from a room

Following the specifications from https://gitlab.com/digitalrepublic/code-challenge

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

## About the solution

I created a folder structure with the Domain Driven Design in mind, where each domain could have a n levels deep folder depending on the complexity of is being build. I think this approach is usually better for big projects since it avoids the problem of having a big folder with dozens of components.

In this case, I ended up isolating just one component in the `src/components/`, the idea here, of course, it is to create a place where "app-wide" components can be stored to be reused. In this folder I would like to have components that are like Inputs, Buttons, Cards, Titles, Lists, etc. The main idea here is to allow some configuration, but not too much to not allow them to lose their original design.

A rather peculiar decision I made was to use JSDocs in conjunction with a vscode configuration to check types, instead of adding a new step of running the typescript transpile step, which is something I hadn't done before. I did this because I read about this idea of using JSDocs on simple projects to decrease the amount of configuration/complexity for the project, the idea being that you would still have the type hints inside the vscode browser, but nothing stopping it from running. 

Initially I thought it was working well, but having to write JSDocs instead of just creating a new Type when it needed is most of the times more cumbersome, specially when working with React (one good example is on `src/PaintCalculator/PaintCalculator.js:18` where I have to type the state hook and it looks very noisy)

Finally, what I would have liked to have done, but I didn't due to lack of time:
  - Separate the classes from the `App.css` file into other `.css` files closer to where they are used
  - Add tests with `react-testing-library`
  - Improved the interface in general. One idea I had was to add a button next to the title of each group of inputs to be able to copy the previously typed values ​​('Copy values ​​from the last wall'), a way to imrpove UX
  - Highlight input fields with errors. Here I opted for the simplest solution that was just checking for the domain rules and pushing to an errors array. Idealy, I would have chose a library like `react-hook-form` which can control the form and highlight form errors before the user click in the button to generate the result.
  - Improve responsiveness, I only created two breaking points, one for cell phone screen and another for a large screen, there could be a middle ground and improve the layout of `Header` elements.


## Como rodar

Clonar o projeto e rodar os comandos na seguinte ordem:

1 - `yarn` ou `npm install`

2 - `yarn start` ou `npm run start`