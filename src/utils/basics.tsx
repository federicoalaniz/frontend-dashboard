import { TripDataForm1 } from "@/state/Trip.type";



function isValid(resultJson: any, originJson: any): boolean {
  // Helper function to check if two objects have the same structure and values
  const compareStructureAndValues = (obj1: any, obj2: any): boolean => {
    if (typeof obj1 !== typeof obj2) return false;
    if (typeof obj1 !== "object" || obj1 === null || obj2 === null)
      return obj1 === obj2;

    if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;
    if (Array.isArray(obj1)) {
      if (obj1.length !== obj2.length) return false;
      for (let i = 0; i < obj1.length; i++) {
        if (!compareStructureAndValues(obj1[i], obj2[i])) return false;
      }
      return true;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!compareStructureAndValues(obj1[key], obj2[key])) return false;
    }
    return true;
  };

  return compareStructureAndValues(resultJson, originJson);
}

const formatDate = (originalDate: Date) => {
  // Crear una copia del objeto Date para evitar mutaciones
  let date = new Date(originalDate.getTime());

  // Array con los días de la semana en español
  let daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  // Array con los meses en español
  let months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

  // Obtener el día de la semana, día del mes y mes
  let dayOfWeek = daysOfWeek[date.getDay()];
  let dayOfMonth = date.getDate();
  let month = months[date.getMonth()];

  // Formatear la fecha como 'Vie, 17 AGO'
  let formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`;
  return formattedDate;
};

const formatDateDDMMYYY = (originalDate: Date) => {
  let date: Date = new Date(originalDate);
  let day: number = date.getDate();
  let month: number = date.getMonth() + 1;
  let year: number = date.getFullYear();
  let dayStr: string = day < 10 ? '0' + day : day.toString();
  let monthStr: string = month < 10 ? '0' + month : month.toString();

  let formattedDate: string = `${dayStr}/${monthStr}/${year}`;
  return formattedDate
}

const ageDetail = (age: string | undefined): string => {
  if (age === undefined) return "null";
  if (age.includes("adult")) return "Adulto"
  if (age.includes("child")) return "Niño"
  if (age.includes("baby")) return "Bebé"
  return "null"
}

const idTypeDetail = (idType: string) => {
  if (idType.includes("dni")) return "DNI"
  if (idType.includes("passport")) return "Pasaporte"
  if (idType.includes("ci")) return "CI"
  if (idType.includes("rut")) return "RUT"
  return null

}

const transferTypeDescription = (data: TripDataForm1) => {
  if (data.tripType.transferType.includes('particular')) return "Traslado particular"
  if (data.tripType.transferType.includes('corporative')) return "Traslado corporativo"
  if (data.tripType.transferType.includes('nat_airport')) return "Aeroportuario | Vuelo Nacional"
  if (data.tripType.transferType.includes('int_airport')) return "Aeroportuario | Vuelo Internacional"
}

function obtenerFechaDeHoy(): string {
  const hoy = new Date();
  const dia = hoy.getDate();
  const mes = hoy.toLocaleString('es-ES', { month: 'long' });
  const año = hoy.getFullYear();

  return `${dia} de ${mes.charAt(0).toUpperCase() + mes.slice(1)} de ${año}`;
}

function sumarDuracion(horaPartida: string, travelDuration: number): string {
  // Paso 1: Crear un objeto Date con la hora de partida
  const [hours, minutes] = horaPartida.split(":").map(Number);
  const fechaPartida = new Date();
  fechaPartida.setHours(hours, minutes, 0, 0);

  // Paso 2: Sumar la duración del viaje (convertir segundos a milisegundos)
  fechaPartida.setSeconds(fechaPartida.getSeconds() + travelDuration);

  // Paso 3: Redondear los minutos al múltiplo de 10 más cercano
  let minutosSumados = fechaPartida.getMinutes();
  minutosSumados = Math.ceil(minutosSumados / 10) * 10;

  // Si los minutos exceden 60, ajustar la hora
  if (minutosSumados === 60) {
    fechaPartida.setHours(fechaPartida.getHours() + 1);
    minutosSumados = 0;
  }

  const horasSumadas = fechaPartida.getHours().toString().padStart(2, '0');
  const minutosFormateados = minutosSumados.toString().padStart(2, '0');

  return `${horasSumadas}:${minutosFormateados}`;
}

const formatAddress = (address: string) => {
  return address.split(",").slice(1, 3).join(", ").replace(/\b(?=[A-Za-z]*\d)(?=\d*[A-Za-z])[A-Za-z0-9]{4,8}\b/g, '').trim().replace(/\s{2,}/g, ' ')
}

function calcularFechaLlegada(fechaSalida: string, horaSalida: string, duracionHoras: number): string {
  // Combinar la fecha y la hora de salida en un solo objeto Date
  const [year, month, day] = fechaSalida.split('-').map(Number);
  const [hour, minute] = horaSalida.split(':').map(Number);
  const fechaSalidaDate = new Date(year, month - 1, day, hour, minute);

  // Añadir la duración del viaje en horas
  fechaSalidaDate.setHours(fechaSalidaDate.getHours() + duracionHoras);

  // Array con los días de la semana en español
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  // Array con los meses en español
  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

  // Obtener el día de la semana, día del mes y mes
  const diaSemana = diasSemana[fechaSalidaDate.getDay()];
  const diaMes = fechaSalidaDate.getDate();
  const mes = meses[fechaSalidaDate.getMonth()];

  // Formatear la fecha como 'Vie, 17 AGO'
  const fechaFormateada = `${diaSemana}, ${diaMes < 10 ? '0' + diaMes : diaMes} ${mes}`;

  return fechaFormateada;
}

function updateLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
  localStorage.setItem('ultimoTiempoActualizacion', Date.now().toString());
}

function clearLocalStorageIfInactive(minutes: number) {
  const duration = minutes * 60 * 1000
  const currentTime = Date.now()
  const startTime: number = parseInt(localStorage.getItem("lastTimeAlive") || "") || (currentTime - duration - 100)
  const deltaTime = currentTime - startTime

  if (deltaTime > duration) {
    localStorage.clear();
    console.log("LocalStorage borrado después de una hora desde que se cargó la página", deltaTime, duration);
  }
}

function createTimeCheck(): void {
  
  let checkInterval: number | null | any;
  const minutes: number = parseInt(process.env.NEXT_PUBLIC_TIME_AFTER_LAST_RECORD!)


  const timeCheck = (): void => {

    if (window) {
      const lastTime = localStorage.getItem('ultimoTiempoActualizacion')

      if (lastTime) {
        const currentTime = Date.now();
        const difference = currentTime - parseInt(lastTime, 10);
        
        console.log(`Tiempo restante para limpieza de LocalStorage: ${minutes * 60 * 1000 - difference }`)
        // 5 minutos = 5 * 60 * 1000 milisegundos = 1200000 ms
        if (difference >= minutes * 60 * 1000) {
          console.log(`Han pasado ${minutes} minutos. Limpiando localStorage...`);
          localStorage.clear();
          // Detener más verificaciones cancelando la referencia a la función
          checkInterval = null;
        }
      }

      // Si el checkInterval sigue activo, programar la siguiente verificación
      if (checkInterval) {
        setTimeout(timeCheck, 10 * 1000); // 10 * 1000 ms = 10 segundos
      }
    }
  };

  // Iniciar la primera verificación
  checkInterval = setTimeout(timeCheck, 60 * 1000);

  // Ejecutar la verificación al cargar la página
  timeCheck();
}


export {
  isValid,
  formatDate,
  formatDateDDMMYYY,
  ageDetail,
  idTypeDetail,
  transferTypeDescription,
  obtenerFechaDeHoy,
  sumarDuracion,
  formatAddress,
  calcularFechaLlegada,
  clearLocalStorageIfInactive,
  updateLocalStorage,
  createTimeCheck,
};
