"use client";

import { useState } from "react";
import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";

export default function ModalPreview() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Abrir modal de exemplo
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} className="w-full max-w-md">
        <div className="flex flex-col gap-2">
          <span className="font-display text-title-m text-content">
            Modal de exemplo
          </span>
          <p className="text-body-s text-content-muted">
            Fundo escurecido e card centralizado. Fecha com Esc, clique fora
            ou pelo botão abaixo.
          </p>
        </div>
        <Button variant="primary" onClick={() => setOpen(false)}>
          Fechar
        </Button>
      </Modal>
    </>
  );
}
