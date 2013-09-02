A brief history of Hadron architecture

I don't know how much time I spent (and continue spending) tweaking the Hadron
architecture. At the present day, the `master` branch contains about 70 commits
not all related with the Hadron project itself but including this blog, the
builder, prove of concept and slides.

I think I'm approaching the ultimate design (aye, I know, never is the ultimate
design but this is one which I'm very satisfied) and I would want to share the
evolution process with you and my future I ,)

+++

I tend to overengineer. It is a problem and I know it. When starting Hadron
I tried to keep focus on:

> We are developing a isometric engine! A isometric engine! Stick to that!
> We are not shipping the next Unity!

This means you need to deal with some coupling, you are designing an isometric
engine and not a multipurpose game engine. They are different things.

---
on 2013-09-02
by Salva
