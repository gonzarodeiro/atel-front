const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

const datepicker =
  ('bg',
  {
    localize: {
      month: (n) => months[n],
      day: (n) => days[n]
    },
    formatLong: {}
  });

export default datepicker;
