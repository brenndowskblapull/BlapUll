import pygame, math, random, time

pygame.init()
screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

PAUSE_MIN = 0.2
PAUSE_MAX = 1.0
DIST_MIN = 40
DIST_MAX = 280
LEN_MIN = 5
LEN_MAX = 8

class Wicht:
    def __init__(self):
        # Startposition
        self.x0 = random.uniform(0, 800)
        self.y0 = random.uniform(0, 600)

        # Richtung & Distanz
        angle = random.uniform(0, math.tau)
        distance = random.uniform(DIST_MIN, DIST_MAX)
        self.x1 = self.x0 + math.cos(angle) * distance
        self.y1 = self.y0 + math.sin(angle) * distance

        self.len0 = random.uniform(LEN_MIN, LEN_MAX)
        self.t = 0.0
        # Flitzgeschwindigkeit
        self.speed = random.uniform(1.6, 2.9)
        self.alive = True

    def update(self, dt):
        self.t += self.speed * dt
        if self.t >= 1:
            self.alive = False

    def draw(self, surf):
        # Linear schrumpfen: l = len0 * (1 - t)
        l = self.len0 * (1 - self.t)
        if l <= 0:
            return

        # Position entlang der Linie
        x = self.x0 + (self.x1 - self.x0) * self.t
        y = self.y0 + (self.y1 - self.y0) * self.t

        dx = self.x1 - self.x0
        dy = self.y1 - self.y0
        L = math.hypot(dx, dy)
        if L == 0:
            return

        nx, ny = dx / L, dy / L
        tx = x - nx * l
        ty = y - ny * l

        pygame.draw.line(surf, (0, 0, 0), (x, y), (tx, ty), 1)

wicht = None
pause_until = 0.0
last = time.time()

running = True
while running:
    dt = clock.tick(60) / 1000
    now = time.time()
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((255, 255, 255))

    if now >= pause_until:
        if wicht is None:
            wicht = Wicht()
        wicht.update(dt)
        if not wicht.alive:
            wicht = None
            pause_until = now + random.uniform(PAUSE_MIN, PAUSE_MAX)

    if wicht and now >= pause_until:
        wicht.draw(screen)

    pygame.display.flip()

pygame.quit()