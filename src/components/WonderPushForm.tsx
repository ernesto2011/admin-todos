"use client";

import { createNotification, getSegments } from "@/services/wonderPushService";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";

interface ActionButton {
  label: string;
  action: string;
  TargetUrl: string;
  icon: string;
}

interface NotificationPreviewProps {
  title: string;
  text: string;
  imageUrl?: string;
  icon?: string;
  actionButtons?: ActionButton[] ;
}

const NotificationPreview = ({
  title,
  text,
  imageUrl,
  icon,
  actionButtons=[],
}: NotificationPreviewProps) => (
  <div className="max-w-sm mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        {icon ? (
          <img src={icon} alt="Icon" className="w-4 h-4 mr-2" />
        ) : (
          <AiOutlineInfoCircle className="mr-2 w-4 h-4" />
        )}
        <span className="text-sm font-semibold">Navegador Web</span>
      </div>
      <button>
        <AiOutlineClose className="w-4 h-4" />
      </button>
    </div>
    <div className="p-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Notification"
          className="w-full h-32 object-cover mb-2 rounded"
        />
      )}
      <h3 className="font-bold text-lg mb-1">
        {title || "Título de la notificación"}
      </h3>
      <p className="text-gray-600 text-sm">{text || "Contenido de la notificación"}</p>
      <p className="text-gray-400 text-xs">www.example.com</p>
      {actionButtons.length > 0 && (
        <div className="flex space-x-2 mt-2">
          {actionButtons?.map((button, index) =>
            button.label ? (
              <button
                key={index}
                onClick={() => (window.location.href = button.TargetUrl || "#")}
                className={`${
                  actionButtons?.length === 1 ? "w-full" : "w-1/2"
                } bg-gray-500 text-white py-1 px-2 rounded mr-2`}
              >
                {button.label}
              </button>
            ) : null
          )}
        </div>
      )}
    </div>
  </div>
);

interface Segment {
  id: string;
  name: string;
}

export const WonderPushForm = () => {
  const [formData, setFormData] = useState<{
    title: string;
    text: string;
    url: string;
    imageUrl: string;
    icon: string;
    expirationTime: string;
    priority: string;
    actionButtons: ActionButton[];
    data: string;
  }>({
    title: "",
    text: "",
    url: "",
    imageUrl: "",
    icon: "",
    expirationTime: "",
    priority: "normal",
    actionButtons: [{ label: "", action: "", TargetUrl: "", icon: "" }],
    data: "",
  });

  const [activeTab, setActiveTab] = useState<number>(0);
  const [targetSegments, setTargetSegments] = useState<string[]>([]);
  const [targetSegmentIds, setTargetSegmentIds] = useState<Segment[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<string>("");

  useEffect(() => {
    const loadSegments = async () => {
      
        try {
          const segments = await getSegments();
          setTargetSegmentIds(segments);
        } catch (error) {
          console.error("Error al cargar los segmentos:", error);
        }
    };

    loadSegments();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddActionButton = () => {
    if (formData.actionButtons.length < 2) {
      setFormData((prev) => ({
        ...prev,
        actionButtons: [...prev.actionButtons, { label: "", action: "", TargetUrl: "", icon: "" }],
      }));
    }
  };

  const handleRemoveActionButton = (index: number) => {
    const newButtons = [...formData.actionButtons];
    newButtons.splice(index, 1);
    setFormData((prev) => ({ ...prev, actionButtons: newButtons }));
  };

  const handleActionButtonChange = (index: number, field: keyof ActionButton, value: string) => {
    const newButtons = [...formData.actionButtons];
    newButtons[index][field] = value;
    setFormData((prev) => ({ ...prev, actionButtons: newButtons }));
  };

  const handleSegmentSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSegmentId = e.target.value;
    if (selectedSegmentId && !targetSegments.includes(selectedSegmentId)) {
      setTargetSegments([...targetSegments, selectedSegmentId]);
    }
    setSelectedSegment("");
  };

  const handleRemoveSegment = (segmentId: string) => {
    const updatedSegments = targetSegments.filter((id) => id !== segmentId);
    setTargetSegments(updatedSegments);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      targetSegmentIds: targetSegments,
    };
    console.log(dataToSend);
    await createNotification(dataToSend);
  };

  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/3 bg-white shadow rounded-lg p-4">
        <div className=" flex flex-col mb-4 gap-2">
          <h2 className="text-xl font-medium">Crear Notificación Push</h2>
          <p className="text-gray-500">Complete los campos para enviar una notificación web push.</p>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button 
              onClick={() => setActiveTab(0)} 
              className={`px-3 py-2 font-medium text-sm ${activeTab === 0 ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
              General
            </button>
            <button 
              onClick={() => setActiveTab(1)} 
              className={`px-3 py-2 font-medium text-sm ${activeTab === 1 ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Configuración Avanzada
            </button>
            <button 
              onClick={() => setActiveTab(2)} 
              className={`px-3 py-2 font-medium text-sm ${activeTab === 2 ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'}`}>
              Botones de Acción
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contenido basado en la pestaña activa */}
          {activeTab === 0 && (
            <>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  required 
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Texto de la notificación</label>
                <textarea 
                  id="text" 
                  name="text" 
                  value={formData.text} 
                  onChange={handleInputChange} 
                  required 
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL de destino</label>
                <input 
                  type="url" 
                  id="url" 
                  name="url" 
                  value={formData.url} 
                  onChange={handleInputChange}  
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL de la imagen (opcional)</label>
                <input 
                  type="url" 
                  id="imageUrl" 
                  name="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleInputChange} 
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
              </div>
              
                  <div>
                  <label htmlFor="targetSegment" className="block text-sm font-medium text-gray-700">Target Segments</label>
                  <select
                    id="targetSegment"
                    name="targetSegment"
                    value={selectedSegment}
                    onChange={handleSegmentSelect}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Seleccione una opción</option>
                    {targetSegmentIds?.map((segment) => (
                      <option key={segment.id} value={segment.id}>
                        {segment.name}
                      </option>
                    ))}
                  </select>
                  </div>     
                {targetSegments.length > 0 && (
                 <div className="mt-4">
                 <h3 className="text-sm font-medium text-gray-700">Segmentos Seleccionados</h3>
                 <ul className="mt-2 space-y-2">
                   {targetSegments.map((segmentId) => (
                     <li key={segmentId} className="flex items-center justify-between py-2 px-3 border border-gray-300 rounded-md shadow-sm">
                       <span>{targetSegmentIds.find(segment => segment.id === segmentId)?.name || 'Segmento desconocido'}</span>
                       <button 
                         type="button" 
                         onClick={() => handleRemoveSegment(segmentId)}
                         className="text-red-600 hover:text-red-800"
                       >
                         Eliminar
                       </button>
                     </li>
                   ))}
                 </ul>
               </div>
              )}
                    
            </>
          )}

          {activeTab === 1 && (
            <>
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">URL del icono (opcional)</label>
                <input 
                  type="url" 
                  id="icon" 
                  name="icon" 
                  value={formData.icon} 
                  onChange={handleInputChange} 
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                />
              </div>
              <div>
                <label htmlFor="expirationTime" className="block text-sm font-medium text-gray-700">Fecha y hora de entrega especifica</label>
                <input 
                  type="datetime-local" 
                  id="expirationTime" 
                  name="expirationTime" 
                  value={formData.expirationTime} 
                  onChange={handleInputChange} 
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
                <select 
                  id="priority" 
                  name="priority" 
                  value={formData.priority} 
                  onChange={handleInputChange} 
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                </select>
              </div>
              <div>
                <label htmlFor="data" className="block text-sm font-medium text-gray-700">Datos personalizados (JSON)</label>
                <textarea 
                  id="data" 
                  name="data" 
                  value={formData.data} 
                  onChange={handleInputChange} 
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </>
          )}

          {activeTab === 2 && (
            <>
              <div className="space-y-4">
              {formData.actionButtons.map((button, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Etiqueta del botón</label>
                      <input 
                        type="text" 
                        value={button.label} 
                        onChange={(e) => handleActionButtonChange(index, 'label', e.target.value)} 
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Acción del botón</label>
                      <input 
                        type="text" 
                        value={button.action} 
                        onChange={(e) => handleActionButtonChange(index, 'action', e.target.value)} 
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">URL de destino</label>
                      <input 
                        type="url" 
                        value={button.TargetUrl} 
                        onChange={(e) => handleActionButtonChange(index, 'TargetUrl', e.target.value)} 
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Icono del botón</label>
                      <input 
                        type="url" 
                        value={button.icon} 
                        onChange={(e) => handleActionButtonChange(index, 'icon', e.target.value)} 
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveActionButton(index)}
                      className="text-red-600 hover:text-red-800 mt-6"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={handleAddActionButton}
                  disabled={formData.actionButtons.length >= 2} 
                >
                  Añadir botón
                </button>
              </div>
            </>
          )}

          <div>
            <button 
              type="submit" 
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Enviar Notificación
            </button>
          </div>
        </form>
      </div>

      {/* Vista previa de la notificación */}
      <div className="w-full lg:w-1/3">
        <NotificationPreview
          title={formData.title}
          text={formData.text}
          imageUrl={formData.imageUrl}
          icon={formData.icon}
          actionButtons={formData.actionButtons}
        />
      </div>
    </div>
  )
}

