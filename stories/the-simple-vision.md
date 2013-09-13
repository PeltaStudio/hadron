The simple vision

Take a reality, fit it in some data structure gathering all the details you
need to simulate behaviour and depict it on a surface. Now repeat this as fast
as possible. Got it? Ok! That is a simulation.

> That is a game.
+++

I want Hadron design to show just that and nothing more so if you see the
[annotated sources](hadron/docs/source/Game.html) you'll see
(apart of an inspired way to decouple the simulation from the frame rate) a
simple game step with three steps:

 1. **Simulation** - Read the model, take some decissions and change the model.
 2. **Clearing** - Foresee the area that will become dirty and clear it.
 3. **Rendering** - Read and draw the model.

Sounds simple? I hope so. Let's getting serious in the next episode.

---
on 2013-09-13
by Salva

El siguiente hablará del modelo y las facetas.
