import dayjs from 'dayjs';

export const remToNumber = (value: number) => {
  const times = screen.width / 1920;
  return value * 10 * times;
};

export const initFontSize = () => {
  try {
    const body = document.body;
    const html = body.parentElement || (body.parentNode as any);
    html.style.fontSize = `${(screen.width / 1920) * 10}px`;
  } catch (error) {}
};

export const formatDate = (date: string | number) => {
  return +date ? dayjs(+date).format('YYYY-MM-DD') : '';
};
