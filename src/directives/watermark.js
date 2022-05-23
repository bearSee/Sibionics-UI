function creatWatermark(el, binding) {
    const canvas = document.getElementById('watermark') || document.createElement('canvas');
    canvas.id = 'watermark';
    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = 'none';

    const ctx = canvas.getContext('2d');
    ctx.translate(innerWidth * 0.45, innerHeight * 0.4);
    ctx.rotate(-20 * Math.PI / 180);
    ctx.translate(-innerWidth * 0.55, -innerHeight * 0.6);
    ctx.font = '16px YaHei';
    ctx.fillStyle = 'rgba(180, 180, 180, .18)';
    ctx.textBaseline = 'hanging';
    Array(5).fill().forEach((_, i) => {
        Array(8).fill().forEach((__, j) => {
            ctx.fillText(binding.value || '', innerWidth * 1.2 / 5 * i + 50, innerHeight * 1.4 / 8 * j);
        });
    });
    el.appendChild(canvas);
}

export default {
  inserted(el, binding) {
      creatWatermark(el, binding);
  },
  update(el, binding) {
      creatWatermark(el, binding);
  },
};
