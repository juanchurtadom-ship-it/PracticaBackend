function calcularCuota(prestamo, interes, meses) {
    if (prestamo <= 0 || interes <= 0 || meses <= 0) {
        return null;
    }

    const i = interes;
    const n = meses;

    const cuota = prestamo * ((Math.pow(1 + i, n) * i) /
        (Math.pow(1 + i, n) - 1));

    return cuota;
}

module.exports = {
    calcularCuota
};
