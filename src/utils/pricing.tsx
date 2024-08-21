function pricing(
        vehicleQuantity: number,
        driverPrice: number,
        journeyPrice: number,
        travelExpenses: number
    
): number {
    return (journeyPrice + driverPrice) * vehicleQuantity + travelExpenses
}

function travelExpenses(
    inicioViaje: Date,
    finViaje: Date,
    cantidadChoferes: number
): number {
    const costoComidas = 10000;
    const costoHospedaje = 30000;

    let costoTotalComidas = 0;
    let costoTotalHospedaje = 0;

    // Convertir las fechas de inicio y fin a horas en formato 24 horas
    const inicioHora = inicioViaje.getHours();
    const finHora = finViaje.getHours();

    // Verificar si el viaje ocurre en el rango de comidas
    if (
        (inicioHora >= 0 && inicioHora <= 15) ||
        (inicioHora >= 20 && inicioHora <= 23) ||
        (finHora >= 0 && finHora <= 15) ||
        (finHora >= 20 && finHora <= 23)
    ) {
        costoTotalComidas = costoComidas * cantidadChoferes;
    }

    // Verificar si el viaje ocurre en el rango de hospedaje
    if (
        (inicioHora >= 21 || inicioHora <= 4) ||
        (finHora >= 21 || finHora <= 4)
    ) {
        costoTotalHospedaje = costoHospedaje * cantidadChoferes;
    }

    // Sumar los costos
    return costoTotalComidas + costoTotalHospedaje;
}

function foodExpenses(inicioViaje: Date, finViaje: Date, costoPorComida: number): number {
    // const costoPorComida = 10000;
    let comidasPorDia = 0;
    
    // Define los rangos de horas en que se considera una comida
    const rangoManana = { start: 0, end: 15 };
    const rangoNoche = { start: 20, end: 23 };

    // Verificar si el viaje cae en el rango de la mañana o noche en el primer día
    if (inicioViaje.getHours() >= rangoManana.start && inicioViaje.getHours() <= rangoManana.end) {
        comidasPorDia++;
    } else if (inicioViaje.getHours() >= rangoNoche.start && inicioViaje.getHours() <= rangoNoche.end) {
        comidasPorDia++;
    }

    // Verificar si el viaje cae en el rango de la mañana o noche en el último día
    if (finViaje.getHours() >= rangoManana.start && finViaje.getHours() <= rangoManana.end) {
        comidasPorDia++;
    } else if (finViaje.getHours() >= rangoNoche.start && finViaje.getHours() <= rangoNoche.end) {
        comidasPorDia++;
    }

    // Calcular la cantidad de días de viaje
    const unDia = 24 * 60 * 60 * 1000; // milisegundos en un día
    const duracionViaje = Math.ceil((finViaje.getTime() - inicioViaje.getTime()) / unDia);

    // Calcular el costo total
    const costoTotal = comidasPorDia * costoPorComida * duracionViaje;

    return costoTotal;
}

function lodgingExpenses(inicioViaje: Date, finViaje: Date, costoPorNoche: number) {
    // const costoPorNoche = 30000;
    let noches = 0;

    const unDia = 24 * 60 * 60 * 1000; // milisegundos en un día

    // Recorre cada día del viaje para verificar si cumple con la condición de hospedaje
    for (let fecha = new Date(inicioViaje.getTime()); fecha <= finViaje; fecha = new Date(fecha.getTime() + unDia)) {
        const horaInicio = fecha.getHours();
        const horaFin = new Date(fecha.getTime() + unDia).getHours();

        // Verificar si la noche del día actual cumple con la condición
        if ((horaInicio <= 4 && horaInicio >= 0) || (horaInicio >= 21 && horaInicio <= 23)) {
            noches++;
        }
    }

    // Calcular el costo total
    const costoTotal = noches * costoPorNoche;

    return costoTotal;
}

function journeyPrice(
        vehicleTypePrice: number,
        journeyKM: number
): number {
    return ( vehicleTypePrice * journeyKM )
}

const driverQuantitys = (vehicle: string, journey_km: number) => {
    const vehicle1 = ["sharan7", "sprinter19", "cronos4"]
    const vehicle2 = ["iveco24", "bus45", "bus60"]

    if (vehicle1.includes(vehicle) && journey_km <= 600)
        return 1
    if (vehicle1.includes(vehicle) && journey_km > 600)
        return 2
    if (vehicle2.includes(vehicle) && journey_km <= 100)
        return 1
    if (vehicle2.includes(vehicle) && journey_km > 100)
        return 2
    return 0
}

function driverPrice(
        driverFee: number,
        vehicleCode: string,
        journeyKm: number,
        driverQuantity: number
): number {
    
    const price = driverFee * driverQuantity * journeyKm

    return price
}

function pricingAll (
    vehicleQuantity: number,
    initDate: Date,
    endDate: Date,
    vehicleTypePrice: number,
    driverFee: number,
    vehicleCode: string,
    journeyKm: number,
) {
    const FOOD_COST = 10000;
    const LODGING_COST = 30000;
    let result = {
        travelExpenses: {
            food: {
                quantity: 0,
                cost: FOOD_COST,
                total:0,
            },
            lodging: {
                quantity: 0,
                cost:LODGING_COST,
                total:0,
            },
            total: 0
        },
        journey: {
            distance:journeyKm,
            date: {
                init: initDate,
                end: endDate
            }
        },
        driver: {
            fee: driverFee,
            quantity: 0
        },
        total: 0
    }
    // COSTO TRAYECTO================================================================
    const journey = journeyKm * vehicleTypePrice

    // COSTO CHOFERES================================================================
    const driverQuantityPerCar = (vehicle: string, journey_km: number) => {

        const vehicle1 = ["sharan7", "sprinter19", "cronos4"]
        const vehicle2 = ["sprinter24", "bus45", "bus60"]

        if (vehicle1.includes(vehicle) && journey_km <= 600)
            return 1
        if (vehicle1.includes(vehicle) && journey_km > 600)
            return 2
        if (vehicle2.includes(vehicle) && journey_km <= 100)
            return 1
        if (vehicle2.includes(vehicle) && journey_km > 100)
            return 2
        return 0
    }

    result.driver.quantity = driverQuantityPerCar(vehicleCode, journeyKm)

    const driver = driverFee * result.driver.quantity

    // COSTO VIATICOS================================================================
    

    // Convertir las fechas de inicio y fin a horas en formato 24 horas
    const initTime = initDate.getHours();
    const endTime = endDate.getHours();

    // Verificar si el viaje ocurre en el rango de comidas
    if (
        (initTime >= 0 && initTime <= 15) ||
        (initTime >= 20 && initTime <= 23) ||
        (endTime >= 0 && endTime <= 15) ||
        (endTime >= 20 && endTime <= 23)
    ) {
        result.travelExpenses.food.total = result.travelExpenses.food.cost * result.driver.quantity;
    }

    // Verificar si el viaje ocurre en el rango de hospedaje
    if (
        (initTime >= 21 || initTime <= 4) ||
        (endTime >= 21 || endTime <= 4)
    ) {
        result.travelExpenses.lodging.total = result.travelExpenses.lodging.cost * result.driver.quantity;
    }

    // Sumar los costos
    result.travelExpenses.total = result.travelExpenses.food.total + result.travelExpenses.lodging.total;

    // COSTO TOTAL ==================================================================
    result.total = (journey + driver) * vehicleQuantity + result.travelExpenses.total

    return result


}

export { pricing, travelExpenses, driverQuantitys , journeyPrice, driverPrice, pricingAll, foodExpenses, lodgingExpenses }