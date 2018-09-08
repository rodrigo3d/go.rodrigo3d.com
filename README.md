# GO

![Screenshot](https://go.rodrigo3d.com/screenshot.png)

Este é um modelo simples e minimalista para Jekyll projetado para desenvolvedores que querem escrever posts, mas não querem se preocupar com coisas frontend.

Os recursos do tema:

- Gulp
- Stylus (Jeet, Rupture, Kouto Swiss)
- Smoothscroll
- Pesquisa em tempo real
- Menu Offcanvas 
- Ícones SVG
- Muito pequeno e rápido!
- Shell Script para criar postagens
- Página de tags
- Series page
- Sobre mim página
- Feed RSS
- Sitemap.xml
- Personalização de cores
- Personalização de Informações

## Configuração básica

1. [Install Jekyll](http://jekyllrb.com)
2. Bifurque-se o [Will Jekyll Template](https://github.com/willianjusten/will-jekyll-template/fork)
3. Clone o repo que você acabou de bifurcar.
4. Edite `_config.yml` para personalizar seu site.
5. Confira as mensagens de amostra `_posts` para ver exemplos de atribuição de categorias e tags e outros dados YAML.
6. Leia a documentação abaixo para obter mais ponteiros e documentação de personalização.
7. **Lembre-se de compilar seus arquivos de ativos com o Gulp.**

## Configurações do site e do usuário

Você tem que preencher algumas informações `_config.yml` ara personalizar seu site.

{% highlight bash %}
# Site settings
description: A blog about lorem ipsum dolor sit amet
baseurl: "" # the subpath of your site, e.g. /blog/
url: "http://localhost:3000" # the base hostname & protocol for your site 

# User settings
username: Lorem Ipsum
user_description: Anon Developer at Lorem Ipsum Dolor
user_title: Anon Developer
email: anon@anon.com
twitter_username: lorem_ipsum
github_username:  lorem_ipsum
gplus_username:  lorem_ipsum
disqus_username: lorem_ipsum
{% endhighlight %}
**Não esqueça de mudar sua base antes de construir seu site!**

## Color customization
###Personalização de cores

Todas as variáveis ​​de cores estão em `src/styl/variable`.Para alterar a cor principal, basta definir o novo valor na `main` atribuição. Outras cores são para textos e a cor de fundo do código.

## Creating posts

Você pode usar o `initpost.sh` para criar suas novas postagens. Apenas siga o comando:

{% highlight bash %}
./initpost.sh -c Post Title
{% endhighlight %}

O novo arquivo será criado `_posts` com este formato `date-title.md`.

## Front-matter 

Quando você cria uma nova postagem, precisa preencher as informações da postagem na primeira linha, siga este exemplo:

{% highlight yml %}
---
layout: post
title: "How to use"
date: 2015-08-03 03:32:44
image: '/assets/img/post-image.png'
description: 'First steps to use this template'
tags:
 - jekyll 
 - template 
categories:
 - I love Jekyll
twitter_text: 'How to install and use this template'
---
{% endhighlight %}

## Executando o blog no local
Para compilar os ativos e executar o Jekyll no local, você precisa seguir estas etapas:

- Instalar o [NodeJS](https://nodejs.org/)
- Run `npm install` 
- Run `gulp`

## Questões

Está tendo algum problema para fazer algo funcionar ou quer saber porque eu configurei algo de uma determinada maneira? Faça um ping me no Twitter [@willian_justen](https://twitter.com/willian_justen) ou envie um [GitHub Issue](https://github.com/willianjusten/will-jekyll-template/issues/new).

## Doação

Se você gostou do meu trabalho, me compre um café <3

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UTMFZUHX6EUGE)

## Licença

Este tema é um software livre e de código aberto, distribuído sob a licença The MIT. Então sinta-se livre para usar este tema Jekyll em seu site sem ligar de volta para mim ou usando um aviso legal.

Se você gostaria de me dar crédito em algum lugar do seu blog ou tweetar um [@willian_justen](https://twitter.com/willian_justen),  seria bem legal.








You'll find this post in your `_posts` directory - edit this post and re-build (or run with the `-w` switch) to see your changes!
To add new posts, simply add a file in the `_posts` directory that follows the convention: YYYY-MM-DD-name-of-post.ext.

![Screenshot](https://go.rodrigo3d.com/screenshot.png)

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll's GitHub repo][jekyll-gh].

[jekyll-gh]: https://github.com/mojombo/jekyll
[jekyll]:    http://jekyllrb.com
