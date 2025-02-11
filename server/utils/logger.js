const { createLogger, format, transports} = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        // log ra file
        new transports.File({ filename: 'logs/error.log', level: 'error'}),
        new transports.File({ filename: 'logs/combined.log'}),

        // log ra console
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({ timestamp, level, message, stack}) => {
                    return `[${timestamp}] ${level}: ${message} ${stack ? `\n${stack}` : ''}`
                })
            )
        })
    ]
})