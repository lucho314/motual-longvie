<?php

namespace App\Mail;

use App\Models\CorreoEnviado;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LiquidacionMail extends Mailable
{
    use Queueable, SerializesModels;
    public $socio;
    public $retenciones;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($socio, $retenciones)
    {
        $this->socio = $socio;
        $this->retenciones = $retenciones;

        CorreoEnviado::create([
            'socio_id' => $socio->id,
            'correo' => $socio->correo,
            'asunto' => 'Liquidación del periodo',
        ]);
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Liquidación del periodo',
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.liquidacion', // acá va la vista que creaste
            with: [
                'socio' => $this->socio,
                'retenciones' => $this->retenciones,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
