# LuegoPago
Un sistema de administración de agendas de servicios cuenta con un módulo que permite la
programación de citas para dichos servicios. Estas citas deben tener una duración mínima de 30
minutos y una duración máxima de 90 minutos. El horario de atención del sistema se encuentra
entre las 9:00 y las 17:00 horas.

Se proporciona un archivo JSON como entrada, el cual contiene un array que hace referencia al día
de la semana, la hora de inicio y la duración de la cita programada.


En este contexto, se requiere la creación de un método que tome como parámetro el día de la
semana que se desea consultar y devuelva el cálculo del total de espacios disponibles para ese día,
teniendo en cuenta que la duración mínima de una cita es de 30 minutos.
