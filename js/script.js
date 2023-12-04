async function consultarIntervalos() {
    const diaSeleccionado = document.getElementById("dia").value;

    const response = await fetch('https://luegopago.blob.core.windows.net/luegopago-uploads/Pruebas%20LuegoPago/data.json');
    const citasJson = await response.json();

    const citasDelDia = citasJson.filter(cita => cita.Day.toLowerCase() === diaSeleccionado.toLowerCase());

    const horarioInicioAtencion = 9 * 60;
    const horarioFinAtencion = 17 * 60;
    const duracionMinimaCita = 30;

    let intervalosDisponibles = [];

    let intervaloInicio = horarioInicioAtencion;

    for (const cita of citasDelDia) {
      const horaInicioCita = parseInt(cita.Hour.split(':')[0]) * 60 + parseInt(cita.Hour.split(':')[1]);
      const duracionCita = parseInt(cita.Duration);

      const espacioAntesCita = horaInicioCita - intervaloInicio;
      if (espacioAntesCita >= duracionMinimaCita) {
        intervalosDisponibles.push({
          inicio: intervaloInicio,
          fin: Math.min(horaInicioCita, horarioFinAtencion)
        });
      }

      intervaloInicio = Math.min(horarioFinAtencion, horaInicioCita + duracionCita);
    }

    if (intervaloInicio < horarioFinAtencion && (horarioFinAtencion - intervaloInicio) >= duracionMinimaCita) {
      intervalosDisponibles.push({
        inicio: intervaloInicio,
        fin: horarioFinAtencion
      });
    }

    mostrarResultados(intervalosDisponibles);
  }

  function mostrarResultados(intervalos) {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    if (intervalos.length === 0) {
      resultadosDiv.innerHTML = "<p>No hay intervalos disponibles para el día seleccionado.</p>";
    } else {
      const listaIntervalos = document.createElement("ul");
      intervalos.forEach(intervalo => {
        const li = document.createElement("li");
        li.textContent = `${minutosAHoraYMinutos(intervalo.inicio)} - ${minutosAHoraYMinutos(intervalo.fin)}`;
        listaIntervalos.appendChild(li);
      });
      resultadosDiv.appendChild(listaIntervalos);
    }
  }

  function minutosAHoraYMinutos(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutosRestantes).padStart(2, '0')}`;
  }