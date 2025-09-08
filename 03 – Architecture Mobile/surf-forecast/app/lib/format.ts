export function degToArrow(deg: number) {
    const dirs = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
    const ix = Math.round(((deg % 360) / 45)) % 8;
    return dirs[ix];
}


export function ratingDots(r: number) {
    const filled = '●'.repeat(r);
    const empty = '○'.repeat(5 - r);
    return filled + empty;
}