'use client';

import { useState } from 'react';
import { Menu, X, ChevronLeft, Heart, Home as HomeIcon, Users, Zap, User, Send, Plus, CheckCircle, Award, Settings, LogOut, Eye, EyeOff, MessageCircle } from 'lucide-react';

interface EmotionLog {
  emotion: string;
  intensity: number;
  cause: string;
  timestamp: string;
}

interface Post {
  id: number;
  content: string;
  emotion: string;
  likes: number;
  timestamp: string;
  anonymous: boolean;
}

export default function NeuroLink() {
  // Navigation
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['splash']);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [studentType, setStudentType] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  // App State
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [emotionIntensity, setEmotionIntensity] = useState(5);
  const [emotionCause, setEmotionCause] = useState('');
  const [stressLevel, setStressLevel] = useState(50);
  const [selectedStressCauses, setSelectedStressCauses] = useState<string[]>([]);
  const [emotionLogs, setEmotionLogs] = useState<EmotionLog[]>([
    { emotion: 'Feliz', intensity: 8, cause: 'Terminé mis exámenes', timestamp: '15 may' },
    { emotion: 'Ansioso', intensity: 6, cause: 'Presentación pendiente', timestamp: '14 may' },
    { emotion: 'Cansado', intensity: 7, cause: 'Poco sueño', timestamp: '13 may' },
  ]);
  const [communityPosts, setCommunityPosts] = useState<Post[]>([
    { id: 1, content: 'Hoy fue un día difícil, pero lo logré. Pequeños pasos cuent—an.', emotion: 'Triste', likes: 24, timestamp: 'hace 2h', anonymous: true },
    { id: 2, content: 'Respirar me ayuda más de lo que pensaba. Gracias NeuroLink', emotion: 'Tranquilo', likes: 42, timestamp: 'hace 4h', anonymous: true },
  ]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostEmotion, setNewPostEmotion] = useState('');
  const [newPostAnonymous, setNewPostAnonymous] = useState(true);

  // UI State
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showEmotionSaved, setShowEmotionSaved] = useState(false);
  const [showPostSaved, setShowPostSaved] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; text: string }[]>([
    { role: 'bot', text: 'Hola, estoy aquí para ayudarte a ordenar lo que sientes. ¿Qué te preocupa hoy?' }
  ]);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [completedActivities, setCompletedActivities] = useState<boolean[]>([false, false, false, false, false]);
  const [showPasswordField, setShowPasswordField] = useState(false);

  const navigate = (screen: string) => {
    setNavigationHistory([...navigationHistory, screen]);
    setCurrentScreen(screen);
    setDrawerOpen(false);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      setNavigationHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserPassword('');
    setUserName('');
    setStudentType('');
    setNavigationHistory(['login']);
    setCurrentScreen('login');
    setDrawerOpen(false);
  };

  const emotions = ['Feliz', 'Tranquilo', 'Ansioso', 'Cansado', 'Triste', 'Estresado'];
  const stressCauses = ['Exámenes', 'Tareas', 'Trabajo', 'Entrenamiento', 'Beca', 'Soledad', 'Falta de sueño'];
  const studentTypes = [
    'Deportista de alto rendimiento',
    'Estudiante proveniente de provincia',
    'Estudiante que trabaja y estudia',
    'Estudiante que depende de beca',
    'Otro'
  ];
  const activities = [
    { label: 'Registrar emoción', done: completedActivities[0] },
    { label: 'Respirar 1 minuto', done: completedActivities[1] },
    { label: 'Tomar agua', done: completedActivities[2] },
    { label: 'Revisar carga académica', done: completedActivities[3] },
    { label: 'Descanso activo', done: completedActivities[4] }
  ];

  const toggleActivityComplete = (index: number) => {
    const newCompleted = [...completedActivities];
    newCompleted[index] = !newCompleted[index];
    setCompletedActivities(newCompleted);
  };

  const toggleStressCause = (cause: string) => {
    setSelectedStressCauses(prev =>
      prev.includes(cause) ? prev.filter(c => c !== cause) : [...prev, cause]
    );
  };

  const handleSaveEmotion = () => {
    if (currentEmotion) {
      const newLog: EmotionLog = {
        emotion: currentEmotion,
        intensity: emotionIntensity,
        cause: emotionCause,
        timestamp: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
      };
      setEmotionLogs([newLog, ...emotionLogs]);
      setCurrentEmotion('');
      setEmotionIntensity(5);
      setEmotionCause('');
      setShowEmotionSaved(true);
      setTimeout(() => setShowEmotionSaved(false), 2000);
    }
  };

  const handlePublishPost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Math.max(...communityPosts.map(p => p.id), 0) + 1,
        content: newPostContent,
        emotion: newPostEmotion || 'Neutro',
        likes: 0,
        timestamp: 'justo ahora',
        anonymous: newPostAnonymous
      };
      setCommunityPosts([newPost, ...communityPosts]);
      setNewPostContent('');
      setNewPostEmotion('');
      setShowPostSaved(true);
      setTimeout(() => setShowPostSaved(false), 2000);
    }
  };

  const handleSendChatMessage = () => {
    if (newChatMessage.trim()) {
      setChatMessages([...chatMessages, { role: 'user', text: newChatMessage }]);
      setNewChatMessage('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'bot', text: 'Entiendo. Respira profundo. ¿Hay algo más que quieras compartir?' }]);
      }, 500);
    }
  };

  const handleQuickChatOption = (option: string) => {
    setChatMessages(prev => [...prev, { role: 'user', text: option }]);
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        'Estoy estresado': 'Detectamos un patrón de estrés. Te recomendamos hacer el ejercicio de respiración guiada.',
        'No puedo dormir': 'La falta de sueño afecta tu bienestar. Intenta establecer una rutina y evitar pantallas antes de dormir.',
        'Tengo muchas tareas': 'Organicemos tus tareas. Prioriza lo urgente y divide en pasos pequeños.',
        'Necesito motivación': 'Has avanzado mucho. Hoy también cuenta. Tu progreso emocional importa.'
      };
      setChatMessages(prev => [...prev, { role: 'bot', text: responses[option] || 'Estoy aquí para apoyarte.' }]);
    }, 500);
  };

  // Drawer Component
  const Drawer = () => (
    <div className={`fixed inset-0 z-40 transition-all duration-300 ${drawerOpen ? 'bg-black/50' : 'bg-black/0 pointer-events-none'}`}
      onClick={() => setDrawerOpen(false)}>
      <div className={`fixed left-0 top-0 h-full w-64 bg-[#1A2839] transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={e => e.stopPropagation()}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#2D3E50]">
            <h2 className="text-xl font-bold text-[#F1F5F9]">Menú</h2>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <button onClick={() => navigate('dashboard')} className="w-full text-left px-4 py-3 rounded-lg text-[#F1F5F9] hover:bg-[#2D3E50]">Dashboard</button>
            <button onClick={() => navigate('emotional-history')} className="w-full text-left px-4 py-3 rounded-lg text-[#F1F5F9] hover:bg-[#2D3E50]">Historial emocional</button>
            <button onClick={() => navigate('activities')} className="w-full text-left px-4 py-3 rounded-lg text-[#F1F5F9] hover:bg-[#2D3E50]">Actividades</button>
            <button onClick={() => navigate('achievements')} className="w-full text-left px-4 py-3 rounded-lg text-[#F1F5F9] hover:bg-[#2D3E50]">Logros</button>
            <button onClick={() => navigate('premium')} className="w-full text-left px-4 py-3 rounded-lg text-[#F1F5F9] hover:bg-[#2D3E50]">Premium</button>
            <button onClick={() => navigate('settings')} className="w-full text-left px-4 py-3 rounded-lg text-[#F1F5F9] hover:bg-[#2D3E50]">Configuración</button>
          </nav>
          <div className="p-4 border-t border-[#2D3E50]">
            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-red-400 hover:bg-[#2D3E50]">
              <LogOut size={18} /> Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Header Component
  const Header = ({ title, showMenu = true, onMenuClick }: { title: string; showMenu?: boolean; onMenuClick?: () => void }) => (
    <div className="flex items-center justify-between p-4 border-b border-[#2D3E50]">
      {navigationHistory.length > 1 ? (
        <button onClick={goBack} className="text-[#7C3AED]"><ChevronLeft size={24} /></button>
      ) : (
        <div />
      )}
      <h1 className="text-lg font-bold text-[#F1F5F9]">{title}</h1>
      {showMenu ? (
        <button onClick={() => setDrawerOpen(true)} className="text-[#7C3AED]"><Menu size={24} /></button>
      ) : (
        <div />
      )}
    </div>
  );

  // Bottom Navigation
  const BottomNav = () => isLoggedIn ? (
    <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-[#0F172A] border-t border-[#2D3E50] flex justify-around">
      <button onClick={() => navigate('dashboard')} className={`flex-1 py-4 flex flex-col items-center gap-1 ${currentScreen === 'dashboard' ? 'text-[#7C3AED]' : 'text-[#94A3B8]'}`}>
        <HomeIcon size={20} /> <span className="text-xs">Inicio</span>
      </button>
      <button onClick={() => navigate('emotion-log')} className={`flex-1 py-4 flex flex-col items-center gap-1 ${currentScreen === 'emotion-log' ? 'text-[#7C3AED]' : 'text-[#94A3B8]'}`}>
        <Heart size={20} /> <span className="text-xs">Registro</span>
      </button>
      <button onClick={() => navigate('community')} className={`flex-1 py-4 flex flex-col items-center gap-1 ${currentScreen === 'community' ? 'text-[#7C3AED]' : 'text-[#94A3B8]'}`}>
        <Users size={20} /> <span className="text-xs">Comunidad</span>
      </button>
      <button onClick={() => navigate('ai-analysis')} className={`flex-1 py-4 flex flex-col items-center gap-1 ${currentScreen === 'ai-analysis' ? 'text-[#7C3AED]' : 'text-[#94A3B8]'}`}>
        <Zap size={20} /> <span className="text-xs">IA</span>
      </button>
      <button onClick={() => navigate('profile')} className={`flex-1 py-4 flex flex-col items-center gap-1 ${currentScreen === 'profile' ? 'text-[#7C3AED]' : 'text-[#94A3B8]'}`}>
        <User size={20} /> <span className="text-xs">Perfil</span>
      </button>
    </div>
  ) : null;

  // SCREENS
  // 1. Splash Screen
  if (currentScreen === 'splash') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F172A] max-w-md mx-auto">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-[#F1F5F9] mb-2">NeuroLink</h1>
          <p className="text-[#94A3B8] mb-8">Conecta con tu bienestar emocional</p>
          <button onClick={() => navigate('onboarding')} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition">
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  // 2. Onboarding
  if (currentScreen === 'onboarding') {
    const onboardingContent = [
      {
        title: 'Registra tus emociones',
        description: 'Mantén un registro diario de cómo te sientes. Pequeños pasos, grandes cambios.',
        icon: Heart
      },
      {
        title: 'IA te analiza',
        description: 'Nuestro sistema detecta patrones y te da recomendaciones personalizadas.',
        icon: Zap
      },
      {
        title: 'Comunidad anónima',
        description: 'Conecta con otros estudiantes en un espacio seguro y confidencial.',
        icon: Users
      }
    ];

    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center max-w-md mx-auto">
        <div className="w-full px-6">
          <div className="text-center mb-8">
            {onboardingContent[onboardingStep - 1].icon === Heart ? (
              <Heart className="mx-auto mb-4 text-[#7C3AED]" size={48} />
            ) : onboardingContent[onboardingStep - 1].icon === Zap ? (
              <Zap className="mx-auto mb-4 text-[#7C3AED]" size={48} />
            ) : (
              <Users className="mx-auto mb-4 text-[#7C3AED]" size={48} />
            )}
            <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">{onboardingContent[onboardingStep - 1].title}</h2>
            <p className="text-[#94A3B8]">{onboardingContent[onboardingStep - 1].description}</p>
          </div>

          <div className="flex gap-2 justify-center mb-8">
            {[1, 2, 3].map(step => (
              <div key={step} className={`h-1 w-8 rounded ${step <= onboardingStep ? 'bg-[#7C3AED]' : 'bg-[#2D3E50]'}`} />
            ))}
          </div>

          <div className="space-y-3">
            {onboardingStep > 1 && (
              <button onClick={() => setOnboardingStep(onboardingStep - 1)} className="w-full border-2 border-[#7C3AED] text-[#7C3AED] font-bold py-3 rounded-2xl hover:bg-[#2D3E50] transition">
                Atrás
              </button>
            )}
            <button onClick={() => onboardingStep < 3 ? setOnboardingStep(onboardingStep + 1) : navigate('register')} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-2xl transition">
              {onboardingStep === 3 ? 'Empezar' : 'Siguiente'}
            </button>
            {onboardingStep === 1 && (
              <button onClick={() => navigate('register')} className="w-full text-[#94A3B8] py-3 text-sm hover:text-[#F1F5F9]">
                Omitir
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Registro
  if (currentScreen === 'register') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col">
        <Header title="Crear cuenta" showMenu={false} />
        <div className="flex-1 px-6 py-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-8">Bienvenido a NeuroLink</h2>

          <input type="text" placeholder="Nombre completo" value={userName} onChange={e => setUserName(e.target.value)} className="w-full bg-[#1A2839] border-[#2D3E50] border rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] mb-4 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />
          <input type="email" placeholder="Correo electrónico" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full bg-[#1A2839] border-[#2D3E50] border rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] mb-4 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />
          <input type="password" placeholder="Contraseña" value={userPassword} onChange={e => setUserPassword(e.target.value)} className="w-full bg-[#1A2839] border-[#2D3E50] border rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] mb-8 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />

          <button onClick={() => { if (userName && userEmail && userPassword) navigate('student-type'); }} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl mb-4 transition disabled:opacity-50" disabled={!userName || !userEmail || !userPassword}>
            Crear cuenta
          </button>

          <button onClick={() => navigate('login')} className="w-full text-center text-[#7C3AED] py-2 hover:underline">
            Ya tengo cuenta
          </button>
        </div>
      </div>
    );
  }

  // 4. Login
  if (currentScreen === 'login') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col">
        <Header title="Iniciar sesión" showMenu={false} />
        <div className="flex-1 px-6 py-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-8">Bienvenido de vuelta</h2>

          <input type="email" placeholder="Correo electrónico" value={userEmail} onChange={e => setUserEmail(e.target.value)} className="w-full bg-[#1A2839] border-[#2D3E50] border rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] mb-4 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />
          <input type="password" placeholder="Contraseña" value={userPassword} onChange={e => setUserPassword(e.target.value)} className="w-full bg-[#1A2839] border-[#2D3E50] border rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] mb-8 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />

          <button onClick={() => { if (userEmail && userPassword) { setIsLoggedIn(true); navigate('dashboard'); } }} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl mb-4 transition disabled:opacity-50" disabled={!userEmail || !userPassword}>
            Iniciar sesión
          </button>

          <button onClick={() => navigate('password-recovery')} className="text-center text-[#7C3AED] py-2 hover:underline text-sm mb-4">
            ¿Olvidaste tu contraseña?
          </button>

          <button onClick={() => navigate('register')} className="text-center text-[#7C3AED] py-2 hover:underline text-sm">
            Crear cuenta
          </button>
        </div>
      </div>
    );
  }

  // 5. Password Recovery
  if (currentScreen === 'password-recovery') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col">
        <Header title="Recuperar contraseña" showMenu={false} />
        <div className="flex-1 px-6 py-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">Reestablecer contraseña</h2>
          <p className="text-[#94A3B8] mb-8">Ingresa tu correo y te enviaremos un enlace.</p>

          <input type="email" placeholder="Correo electrónico" className="w-full bg-[#1A2839] border-[#2D3E50] border rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] mb-8 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />

          {showPasswordReset && (
            <div className="bg-[#1A2839] border border-[#38BDF8] rounded-xl p-4 mb-4">
              <p className="text-[#38BDF8]">✓ Enlace enviado. Revisa tu correo.</p>
            </div>
          )}

          <button onClick={() => setShowPasswordReset(true)} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl mb-4 transition">
            Enviar enlace
          </button>

          <button onClick={() => navigate('login')} className="text-center text-[#7C3AED] py-2 hover:underline">
            Volver al login
          </button>
        </div>
      </div>
    );
  }

  // 6. Student Type Selection
  if (currentScreen === 'student-type') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col">
        <Header title="Tu perfil" showMenu={false} />
        <div className="flex-1 px-6 py-8">
          <h2 className="text-2xl font-bold text-[#F1F5F9] mb-4">¿Cuál es tu situación?</h2>
          <p className="text-[#94A3B8] mb-8">Esto nos ayuda a personalizar tu experiencia.</p>

          <div className="space-y-3 mb-8">
            {studentTypes.map(type => (
              <button key={type} onClick={() => setStudentType(type)} className={`w-full px-4 py-4 rounded-xl border-2 transition text-left font-medium ${studentType === type ? 'border-[#7C3AED] bg-[#1A2839] text-[#F1F5F9]' : 'border-[#2D3E50] bg-transparent text-[#94A3B8] hover:border-[#7C3AED]'}`}>
                {type}
              </button>
            ))}
          </div>

          <button onClick={() => { if (studentType) { setIsLoggedIn(true); navigate('dashboard'); } }} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition disabled:opacity-50" disabled={!studentType}>
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // 7. Dashboard
  if (currentScreen === 'dashboard' && isLoggedIn) {
    const progressPercent = (completedActivities.filter(Boolean).length / completedActivities.length) * 100;
    
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Hola, Micaela" />

        <div className="flex-1 px-6 py-6 space-y-4">
          {/* Progress */}
          <div className="bg-[#1A2839] rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#F1F5F9]">Actividades del día</span>
              <span className="text-xs text-[#94A3B8]">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#0F172A] rounded-full h-2">
              <div className="bg-[#7C3AED] h-2 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Emotion Card */}
          <div className="bg-gradient-to-br from-[#1A2839] to-[#0F172A] border border-[#2D3E50] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-[#7C3AED]" size={24} />
              <h3 className="text-lg font-bold text-[#F1F5F9]">¿Cómo te sientes hoy?</h3>
            </div>
            <p className="text-[#94A3B8] text-sm mb-4">Tu bienestar emocional es importante.</p>
            <button onClick={() => navigate('emotion-log')} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-xl transition">
              Registrar emoción
            </button>
          </div>

          {/* Stress Card */}
          <div className="bg-gradient-to-br from-[#1A2839] to-[#0F172A] border border-[#2D3E50] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-[#38BDF8]" size={24} />
              <h3 className="text-lg font-bold text-[#F1F5F9]">Nivel de estrés</h3>
            </div>
            <p className="text-2xl font-bold text-[#7C3AED] mb-2">{stressLevel}%</p>
            <button onClick={() => navigate('stress-check')} className="w-full bg-[#38BDF8] hover:bg-[#0EA5E9] text-white font-bold py-3 rounded-xl transition">
              Registrar estrés
            </button>
          </div>

          {/* Recent Emotions */}
          <div className="bg-[#1A2839] rounded-2xl p-4">
            <h3 className="font-bold text-[#F1F5F9] mb-4">Últimas emociones</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {emotionLogs.slice(0, 3).map((log, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-[#0F172A] rounded-lg">
                  <div>
                    <p className="font-medium text-[#F1F5F9]">{log.emotion}</p>
                    <p className="text-xs text-[#94A3B8]">{log.timestamp}</p>
                  </div>
                  <p className="text-[#7C3AED] font-bold">{log.intensity}/10</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="bg-gradient-to-br from-[#7C3AED]/10 to-[#38BDF8]/10 border border-[#7C3AED]/30 rounded-2xl p-4">
            <p className="text-sm text-[#F1F5F9] mb-3">💡 <strong>Recomendación IA:</strong> Detectamos un patrón de estrés. Te sugerimos hacer respiración guiada.</p>
            <button onClick={() => navigate('breathing')} className="w-full text-[#7C3AED] font-bold py-2 rounded-lg hover:bg-[#2D3E50] transition">
              Hacer respiración
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 8. Emotion Log
  if (currentScreen === 'emotion-log') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Registrar emoción" />

        <div className="flex-1 px-6 py-6 space-y-6">
          <div>
            <label className="text-sm font-bold text-[#F1F5F9] block mb-3">¿Cómo te sientes?</label>
            <div className="grid grid-cols-3 gap-3">
              {emotions.map(emotion => (
                <button key={emotion} onClick={() => setCurrentEmotion(emotion)} className={`p-4 rounded-xl transition font-medium text-sm ${currentEmotion === emotion ? 'bg-[#7C3AED] text-white border-2 border-[#7C3AED]' : 'bg-[#1A2839] text-[#94A3B8] border-2 border-[#2D3E50] hover:border-[#7C3AED]'}`}>
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-[#F1F5F9] block mb-3">Intensidad: {emotionIntensity}/10</label>
            <input type="range" min="1" max="10" value={emotionIntensity} onChange={e => setEmotionIntensity(parseInt(e.target.value))} className="w-full h-2 bg-[#2D3E50] rounded-lg appearance-none cursor-pointer accent-[#7C3AED]" />
          </div>

          <div>
            <label className="text-sm font-bold text-[#F1F5F9] block mb-2">¿Qué causó esto? (Opcional)</label>
            <textarea value={emotionCause} onChange={e => setEmotionCause(e.target.value)} placeholder="Describe brevemente..." className="w-full bg-[#1A2839] border border-[#2D3E50] rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] min-h-24" />
          </div>

          {showEmotionSaved && (
            <div className="bg-[#1A2839] border border-[#38BDF8] rounded-xl p-4">
              <p className="text-[#38BDF8]">✓ Emoción registrada correctamente.</p>
            </div>
          )}

          <button onClick={handleSaveEmotion} disabled={!currentEmotion} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition disabled:opacity-50">
            Guardar
          </button>

          {emotionLogs.length > 0 && (
            <button onClick={() => navigate('ai-analysis')} className="w-full border-2 border-[#7C3AED] text-[#7C3AED] font-bold py-3 rounded-2xl hover:bg-[#2D3E50] transition">
              Ver análisis IA
            </button>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  // 9. Stress Check
  if (currentScreen === 'stress-check') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Registro de estrés" />

        <div className="flex-1 px-6 py-6 space-y-6">
          <div>
            <label className="text-sm font-bold text-[#F1F5F9] block mb-3">Nivel de estrés: {stressLevel}%</label>
            <input type="range" min="0" max="100" value={stressLevel} onChange={e => setStressLevel(parseInt(e.target.value))} className="w-full h-2 bg-[#2D3E50] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]" />
            <div className="flex justify-between text-xs text-[#94A3B8] mt-2">
              <span>Sin estrés</span>
              <span>Muy estresado</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-[#F1F5F9] block mb-3">¿Qué te estresa? (Selecciona)</label>
            <div className="space-y-2 flex flex-wrap gap-2">
              {stressCauses.map(cause => (
                <button key={cause} onClick={() => toggleStressCause(cause)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedStressCauses.includes(cause) ? 'bg-[#7C3AED] text-white border-2 border-[#7C3AED]' : 'bg-[#1A2839] text-[#94A3B8] border-2 border-[#2D3E50] hover:border-[#7C3AED]'}`}>
                  {cause}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => navigate('ai-analysis')} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition">
            Analizar estrés
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 10. AI Analysis
  if (currentScreen === 'ai-analysis') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Análisis IA" />

        <div className="flex-1 px-6 py-6 space-y-4">
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-[#1A2839] to-[#0F172A] border border-[#2D3E50] rounded-2xl p-6">
            <h3 className="font-bold text-[#F1F5F9] mb-4">Resumen emocional</h3>
            {currentEmotion ? (
              <>
                <p className="text-[#94A3B8] text-sm mb-2">Emoción detectada:</p>
                <p className="text-2xl font-bold text-[#7C3AED] mb-4">{currentEmotion}</p>
              </>
            ) : (
              <p className="text-[#94A3B8] mb-4">Registra una emoción para obtener análisis.</p>
            )}
          </div>

          {/* Stress Card */}
          <div className="bg-gradient-to-br from-[#1A2839] to-[#0F172A] border border-[#2D3E50] rounded-2xl p-6">
            <h3 className="font-bold text-[#F1F5F9] mb-4">Nivel de estrés</h3>
            <p className="text-2xl font-bold text-[#38BDF8] mb-2">{stressLevel}%</p>
            <div className="w-full bg-[#0F172A] rounded-full h-2">
              <div className="bg-[#38BDF8] h-2 rounded-full" style={{ width: `${stressLevel}%` }}></div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-[#1A2839] rounded-2xl p-4">
            <h3 className="font-bold text-[#F1F5F9] mb-4">Análisis IA</h3>
            <div className="space-y-2 text-sm">
              <p className="text-[#94A3B8]">📊 <strong>Patrón:</strong> {selectedStressCauses.length > 0 ? `Tu estrés está relacionado con ${selectedStressCauses.slice(0, 2).join(', ')}.` : 'Múltiples factores detectados.'}</p>
              <p className="text-[#94A3B8]">💡 <strong>Recomendación:</strong> Respira profundo. No tienes que resolver todo hoy.</p>
              <p className="text-[#94A3B8]">🎯 <strong>Próximo paso:</strong> Haz el ejercicio de respiración guiada.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button onClick={() => navigate('breathing')} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-2xl transition">
              Hacer respiración
            </button>
            <button onClick={() => navigate('recommendations')} className="w-full border-2 border-[#7C3AED] text-[#7C3AED] font-bold py-3 rounded-2xl hover:bg-[#2D3E50] transition">
              Ver recomendaciones
            </button>
            <button onClick={() => navigate('dashboard')} className="w-full border-2 border-[#2D3E50] text-[#94A3B8] font-bold py-3 rounded-2xl hover:border-[#7C3AED] transition">
              Ir al dashboard
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 11. Recommendations
  if (currentScreen === 'recommendations') {
    const recs = [
      { title: 'Respiración guiada', desc: 'Ejercicio de 5 min', icon: 'Respirar', screen: 'breathing' },
      { title: 'Pausa activa', desc: 'Movimiento y relax', icon: 'Pausar', screen: 'pause' },
      { title: 'Organizar pendientes', desc: 'Prioriza tus tareas', icon: 'Organizar', screen: 'activities' },
      { title: 'Dormir mejor', desc: 'Rutina nocturna', icon: 'Dormir', screen: 'dashboard' },
      { title: 'Escribir en comunidad', desc: 'Conecta con otros', icon: 'Escribir', screen: 'create-post' }
    ];

    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Recomendaciones" />

        <div className="flex-1 px-6 py-6 space-y-3">
          {recs.map((rec, i) => (
            <button key={i} onClick={() => navigate(rec.screen)} className="w-full bg-gradient-to-r from-[#1A2839] to-[#0F172A] border border-[#2D3E50] hover:border-[#7C3AED] rounded-2xl p-4 text-left transition">
              <h3 className="font-bold text-[#F1F5F9] mb-1">{rec.title}</h3>
              <p className="text-sm text-[#94A3B8]">{rec.desc}</p>
            </button>
          ))}
        </div>
        <BottomNav />
      </div>
    );
  }

  // 12. Breathing Exercise
  if (currentScreen === 'breathing') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col">
        <Header title="Respiración guiada" />

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          {/* Animated Circle */}
          <div className="relative w-48 h-48 mb-8">
            <div className="absolute inset-0 bg-[#7C3AED]/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-8 bg-[#7C3AED]/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-16 border-4 border-[#7C3AED] rounded-full flex items-center justify-center">
              <Heart className="text-[#7C3AED]" size={40} />
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center mb-8">
            <p className="text-2xl font-bold text-[#F1F5F9] mb-4">Inhala...Mantén...Exhala</p>
            <p className="text-[#94A3B8]">Sigue el ritmo del círculo. Respira lentamente.</p>
          </div>

          {/* Buttons */}
          <div className="space-y-3 w-full">
            <button onClick={() => setShowEmotionSaved(true)} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition">
              Iniciar
            </button>
            <button className="w-full border-2 border-[#7C3AED] text-[#7C3AED] font-bold py-3 rounded-2xl hover:bg-[#2D3E50] transition">
              Pausar
            </button>
            <button onClick={() => { setShowEmotionSaved(true); setTimeout(() => { setShowEmotionSaved(false); navigate('ai-analysis'); }, 2000); }} className="w-full border-2 border-[#38BDF8] text-[#38BDF8] font-bold py-3 rounded-2xl hover:bg-[#2D3E50] transition">
              Completar
            </button>
          </div>

          {showEmotionSaved && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-[#1A2839] border border-[#38BDF8] rounded-xl p-4">
              <p className="text-[#38BDF8] font-medium">✓ Excelente trabajo. Continúa así.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 13. Pause / Pomodoro
  if (currentScreen === 'pause') {
    const [timerMinutes, setTimerMinutes] = useState(5);
    const [timerRunning, setTimerRunning] = useState(false);

    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Pausa activa" />

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
          {/* Timer Display */}
          <div className="text-7xl font-bold text-[#7C3AED] mb-8 font-mono">
            {timerMinutes}:00
          </div>

          {/* Preset Buttons */}
          <div className="flex gap-3 mb-8">
            {[5, 10, 25].map(min => (
              <button key={min} onClick={() => setTimerMinutes(min)} className={`px-6 py-3 rounded-xl font-bold transition ${timerMinutes === min ? 'bg-[#7C3AED] text-white' : 'bg-[#1A2839] text-[#94A3B8] border-2 border-[#2D3E50] hover:border-[#7C3AED]'}`}>
                {min}m
              </button>
            ))}
          </div>

          {/* Control Buttons */}
          <div className="space-y-3 w-full">
            <button onClick={() => setTimerRunning(!timerRunning)} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition">
              {timerRunning ? 'Pausar' : 'Iniciar'}
            </button>
            <button onClick={() => navigate('dashboard')} className="w-full border-2 border-[#2D3E50] text-[#94A3B8] font-bold py-3 rounded-2xl hover:border-[#7C3AED] transition">
              Finalizar
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 14. Emotional History
  if (currentScreen === 'emotional-history') {
    const [historyFilter, setHistoryFilter] = useState('week');

    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Historial emocional" />

        <div className="flex-1 px-6 py-6">
          {/* Filter */}
          <div className="flex gap-2 mb-6">
            {['week', 'month'].map(filter => (
              <button key={filter} onClick={() => setHistoryFilter(filter)} className={`px-4 py-2 rounded-lg font-medium text-sm transition ${historyFilter === filter ? 'bg-[#7C3AED] text-white' : 'bg-[#1A2839] text-[#94A3B8] hover:bg-[#2D3E50]'}`}>
                {filter === 'week' ? 'Esta semana' : 'Este mes'}
              </button>
            ))}
          </div>

          {/* Logs */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {emotionLogs.map((log, i) => (
              <div key={i} className="bg-[#1A2839] rounded-xl p-4 border border-[#2D3E50]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#F1F5F9] text-lg">{log.emotion}</h3>
                  <span className="text-[#7C3AED] font-bold">{log.intensity}/10</span>
                </div>
                {log.cause && <p className="text-sm text-[#94A3B8] mb-2">{log.cause}</p>}
                <p className="text-xs text-[#64748B]">{log.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 15. Community
  if (currentScreen === 'community') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Comunidad anónima" />

        <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
          {/* Create Button */}
          <button onClick={() => navigate('create-post')} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition">
            <Plus size={20} /> Crear publicación
          </button>

          {/* Posts */}
          {communityPosts.map(post => (
            <div key={post.id} className="bg-[#1A2839] rounded-2xl p-4 border border-[#2D3E50]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-10 h-10 bg-[#7C3AED]/20 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-[#7C3AED]" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[#F1F5F9] text-sm">{post.anonymous ? 'Usuario anónimo' : 'Usuario'}</p>
                  <p className="text-xs text-[#64748B]">{post.timestamp}</p>
                </div>
                <span className="text-xs bg-[#7C3AED]/20 text-[#7C3AED] px-2 py-1 rounded-full">{post.emotion}</span>
              </div>
              <p className="text-[#F1F5F9] text-sm mb-3">{post.content}</p>
              <button onClick={() => { const updated = communityPosts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p); setCommunityPosts(updated); }} className="text-sm text-[#94A3B8] hover:text-[#7C3AED] flex items-center gap-1">
                ❤️ {post.likes}
              </button>
            </div>
          ))}
        </div>
        <BottomNav />
      </div>
    );
  }

  // 16. Create Post
  if (currentScreen === 'create-post') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Crear publicación" />

        <div className="flex-1 px-6 py-6 space-y-4">
          <textarea value={newPostContent} onChange={e => setNewPostContent(e.target.value)} placeholder="¿Qué quieres compartir?" className="w-full bg-[#1A2839] border border-[#2D3E50] rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] min-h-24" />

          <div>
            <label className="text-sm font-bold text-[#F1F5F9] block mb-3">Emoción (opcional)</label>
            <div className="grid grid-cols-3 gap-2">
              {emotions.map(emotion => (
                <button key={emotion} onClick={() => setNewPostEmotion(emotion)} className={`p-3 rounded-lg text-xs font-medium transition ${newPostEmotion === emotion ? 'bg-[#7C3AED] text-white border-2 border-[#7C3AED]' : 'bg-[#1A2839] text-[#94A3B8] border-2 border-[#2D3E50] hover:border-[#7C3AED]'}`}>
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1A2839] p-4 rounded-xl">
            <input type="checkbox" checked={newPostAnonymous} onChange={e => setNewPostAnonymous(e.target.checked)} className="w-5 h-5 accent-[#7C3AED] cursor-pointer" />
            <label className="text-[#F1F5F9] font-medium cursor-pointer flex-1">Publicar como anónimo</label>
          </div>

          {showPostSaved && (
            <div className="bg-[#1A2839] border border-[#38BDF8] rounded-xl p-4">
              <p className="text-[#38BDF8]">✓ Publicación creada. La comunidad te agradece.</p>
            </div>
          )}

          <button onClick={handlePublishPost} disabled={!newPostContent.trim()} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition disabled:opacity-50">
            Publicar
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 17. Chatbot (Nia)
  if (currentScreen === 'chatbot') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Nia - Tu asistente" />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-[#7C3AED] text-white' : 'bg-[#1A2839] text-[#F1F5F9] border border-[#2D3E50]'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Options */}
          {chatMessages.length === 1 && (
            <div className="px-6 py-4 space-y-2">
              {['Estoy estresado', 'No puedo dormir', 'Tengo muchas tareas', 'Necesito motivación'].map(option => (
                <button key={option} onClick={() => handleQuickChatOption(option)} className="w-full text-left bg-[#1A2839] border border-[#2D3E50] hover:border-[#7C3AED] rounded-xl px-4 py-3 text-[#F1F5F9] text-sm transition">
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-[#2D3E50] px-6 py-4 flex gap-2 bg-[#0F172A]">
            <input type="text" value={newChatMessage} onChange={e => setNewChatMessage(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendChatMessage()} placeholder="Escribe un mensaje..." className="flex-1 bg-[#1A2839] border border-[#2D3E50] rounded-full px-4 py-2 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />
            <button onClick={handleSendChatMessage} className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white p-2 rounded-full transition">
              <Send size={20} />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="px-6 py-2 text-xs text-[#64748B] text-center border-t border-[#2D3E50]">
            NeuroLink no sustituye apoyo profesional.
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 18. Activities
  if (currentScreen === 'activities') {
    const progressPercent = (completedActivities.filter(Boolean).length / completedActivities.length) * 100;

    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Actividades del día" />

        <div className="flex-1 px-6 py-6">
          {/* Progress */}
          <div className="bg-[#1A2839] rounded-2xl p-4 mb-6 border border-[#2D3E50]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#F1F5F9]">Progreso</span>
              <span className="text-[#7C3AED] font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-[#0F172A] rounded-full h-3">
              <div className="bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] h-3 rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-3">
            {activities.map((activity, i) => (
              <button key={i} onClick={() => toggleActivityComplete(i)} className="w-full flex items-center gap-4 bg-[#1A2839] border-2 border-[#2D3E50] hover:border-[#7C3AED] rounded-xl p-4 transition">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition ${completedActivities[i] ? 'bg-[#7C3AED] border-[#7C3AED]' : 'border-[#2D3E50]'}`}>
                  {completedActivities[i] && <CheckCircle size={16} className="text-white" />}
                </div>
                <span className={`font-medium ${completedActivities[i] ? 'text-[#94A3B8] line-through' : 'text-[#F1F5F9]'}`}>{activity.label}</span>
              </button>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 19. Achievements
  if (currentScreen === 'achievements') {
    const badges = [
      { name: '¡Primer paso!', unlocked: true, desc: 'Registró 1 emoción' },
      { name: 'Respirador', unlocked: true, desc: 'Completó 3 respiraciones' },
      { name: 'Jueves de reflexión', unlocked: true, desc: 'Escribió en la comunidad' },
      { name: 'Mente zen', unlocked: false, desc: 'Registró 10 emociones' },
      { name: 'Adicto al estrés', unlocked: false, desc: 'Registró 20 niveles de estrés' },
      { name: 'Mentor silencioso', unlocked: false, desc: 'Ayudó a 5 compañeros' }
    ];

    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Logros y badges" />

        <div className="flex-1 px-6 py-6">
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, i) => (
              <div key={i} className={`rounded-2xl p-6 text-center border-2 transition ${badge.unlocked ? 'bg-[#1A2839] border-[#7C3AED]' : 'bg-[#0F172A] border-[#2D3E50] opacity-60'}`}>
                <div className={`text-4xl mb-2 ${badge.unlocked ? '' : 'grayscale'}`}>
                  {badge.unlocked ? '🏆' : '🔒'}
                </div>
                <h3 className="font-bold text-[#F1F5F9] text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-[#94A3B8]">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 20. Profile
  if (currentScreen === 'profile') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Perfil" />

        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <div className="w-24 h-24 bg-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-white" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[#F1F5F9]">{userName || 'Micaela'}</h2>
            <p className="text-[#94A3B8]">{studentType || 'Estudiante'}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#1A2839] rounded-xl p-4 text-center border border-[#2D3E50]">
              <p className="text-2xl font-bold text-[#7C3AED]">7</p>
              <p className="text-xs text-[#94A3B8] mt-1">Racha días</p>
            </div>
            <div className="bg-[#1A2839] rounded-xl p-4 text-center border border-[#2D3E50]">
              <p className="text-2xl font-bold text-[#38BDF8]">{emotionLogs.length}</p>
              <p className="text-xs text-[#94A3B8] mt-1">Emociones</p>
            </div>
            <div className="bg-[#1A2839] rounded-xl p-4 text-center border border-[#2D3E50]">
              <p className="text-2xl font-bold text-[#7C3AED]">{isPremium ? 'Pro' : 'Free'}</p>
              <p className="text-xs text-[#94A3B8] mt-1">Plan</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button onClick={() => navigate('edit-profile')} className="w-full bg-[#1A2839] border border-[#2D3E50] hover:border-[#7C3AED] rounded-xl px-4 py-3 text-[#F1F5F9] font-bold transition">
              Editar perfil
            </button>
            <button onClick={() => navigate('settings')} className="w-full bg-[#1A2839] border border-[#2D3E50] hover:border-[#7C3AED] rounded-xl px-4 py-3 text-[#F1F5F9] font-bold transition">
              Configuración
            </button>
            <button onClick={() => navigate('privacy')} className="w-full bg-[#1A2839] border border-[#2D3E50] hover:border-[#7C3AED] rounded-xl px-4 py-3 text-[#F1F5F9] font-bold transition">
              Privacidad
            </button>
            <button onClick={() => navigate('notifications')} className="w-full bg-[#1A2839] border border-[#2D3E50] hover:border-[#7C3AED] rounded-xl px-4 py-3 text-[#F1F5F9] font-bold transition">
              Notificaciones
            </button>
            <button onClick={() => navigate('premium')} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-2xl transition">
              Ver Premium
            </button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 21. Edit Profile
  if (currentScreen === 'edit-profile') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Editar perfil" />

        <div className="flex-1 px-6 py-6 space-y-4">
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Nombre completo" className="w-full bg-[#1A2839] border border-[#2D3E50] rounded-xl px-4 py-3 text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />

          <div>
            <label className="text-sm font-bold text-[#F1F5F9] block mb-3">Tipo de estudiante</label>
            <div className="space-y-2">
              {studentTypes.map(type => (
                <button key={type} onClick={() => setStudentType(type)} className={`w-full px-4 py-3 rounded-xl border-2 transition text-left font-medium text-sm ${studentType === type ? 'border-[#7C3AED] bg-[#1A2839] text-[#F1F5F9]' : 'border-[#2D3E50] bg-transparent text-[#94A3B8] hover:border-[#7C3AED]'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => { setShowEmotionSaved(true); setTimeout(() => { setShowEmotionSaved(false); navigate('profile'); }, 2000); }} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition">
            Guardar cambios
          </button>

          {showEmotionSaved && (
            <div className="bg-[#1A2839] border border-[#38BDF8] rounded-xl p-4">
              <p className="text-[#38BDF8]">✓ Perfil actualizado.</p>
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  // 22. Settings
  if (currentScreen === 'settings') {
    const [darkMode, setDarkMode] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Configuración" />

        <div className="flex-1 px-6 py-6 space-y-4">
          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-xl p-4 flex items-center justify-between">
            <span className="text-[#F1F5F9] font-medium">Tema oscuro</span>
            <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-6 rounded-full transition flex items-center ${darkMode ? 'bg-[#7C3AED]' : 'bg-[#2D3E50]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition ${darkMode ? 'ml-1' : 'ml-6'}`}></div>
            </button>
          </div>

          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-xl p-4 flex items-center justify-between">
            <span className="text-[#F1F5F9] font-medium">Notificaciones</span>
            <button onClick={() => setNotificationsEnabled(!notificationsEnabled)} className={`w-12 h-6 rounded-full transition flex items-center ${notificationsEnabled ? 'bg-[#7C3AED]' : 'bg-[#2D3E50]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition ${notificationsEnabled ? 'ml-1' : 'ml-6'}`}></div>
            </button>
          </div>

          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-xl p-4">
            <label className="text-[#F1F5F9] font-medium block mb-2">Idioma</label>
            <select className="w-full bg-[#0F172A] border border-[#2D3E50] rounded-lg px-3 py-2 text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]">
              <option>Español</option>
              <option>English</option>
              <option>Português</option>
            </select>
          </div>

          <button className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-2xl transition">
            Guardar
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // 23. Privacy
  if (currentScreen === 'privacy') {
    const [anonMode, setAnonMode] = useState(true);
    const [shareData, setShareData] = useState(false);
    const [allowAI, setAllowAI] = useState(true);

    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Privacidad" />

        <div className="flex-1 px-6 py-6 space-y-4">
          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-xl p-4 flex items-center justify-between">
            <span className="text-[#F1F5F9] font-medium">Modo anónimo</span>
            <button onClick={() => setAnonMode(!anonMode)} className={`w-12 h-6 rounded-full transition flex items-center ${anonMode ? 'bg-[#7C3AED]' : 'bg-[#2D3E50]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition ${anonMode ? 'ml-1' : 'ml-6'}`}></div>
            </button>
          </div>

          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-xl p-4 flex items-center justify-between">
            <span className="text-[#F1F5F9] font-medium">Compartir datos agregados</span>
            <button onClick={() => setShareData(!shareData)} className={`w-12 h-6 rounded-full transition flex items-center ${shareData ? 'bg-[#7C3AED]' : 'bg-[#2D3E50]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition ${shareData ? 'ml-1' : 'ml-6'}`}></div>
            </button>
          </div>

          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-xl p-4 flex items-center justify-between">
            <span className="text-[#F1F5F9] font-medium">Permitir análisis IA</span>
            <button onClick={() => setAllowAI(!allowAI)} className={`w-12 h-6 rounded-full transition flex items-center ${allowAI ? 'bg-[#7C3AED]' : 'bg-[#2D3E50]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition ${allowAI ? 'ml-1' : 'ml-6'}`}></div>
            </button>
          </div>

          <button onClick={() => { setShowEmotionSaved(true); setTimeout(() => setShowEmotionSaved(false), 2000); }} className="w-full border-2 border-red-500 text-red-500 font-bold py-3 rounded-2xl hover:bg-red-500/10 transition mt-6">
            Eliminar todos los registros
          </button>

          {showEmotionSaved && (
            <div className="bg-[#1A2839] border border-[#38BDF8] rounded-xl p-4">
              <p className="text-[#38BDF8]">✓ Cambios guardados.</p>
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  // 24. Notifications Settings
  if (currentScreen === 'notifications') {
    const [remindEmotion, setRemindEmotion] = useState(true);
    const [remindRest, setRemindRest] = useState(true);
    const [remindMotivation, setRemindMotivation] = useState(false);

    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Notificaciones" />

        <div className="flex-1 px-6 py-6 space-y-4">
          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-xl p-4 flex items-center justify-between">
            <span className="text-[#F1F5F9] font-medium">Recordatorio emocional</span>
            <button onClick={() => setRemindEmotion(!remindEmotion)} className={`w-12 h-6 rounded-full transition flex items-center ${remindEmotion ? 'bg-[#7C3AED]' : 'bg-[#2D3E50]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition ${remindEmotion ? 'ml-1' : 'ml-6'}`}></div>
            </button>
          </div>

          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-xl p-4 flex items-center justify-between">
            <span className="text-[#F1F5F9] font-medium">Recordatorio de descanso</span>
            <button onClick={() => setRemindRest(!remindRest)} className={`w-12 h-6 rounded-full transition flex items-center ${remindRest ? 'bg-[#7C3AED]' : 'bg-[#2D3E50]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition ${remindRest ? 'ml-1' : 'ml-6'}`}></div>
            </button>
          </div>

          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-xl p-4 flex items-center justify-between">
            <span className="text-[#F1F5F9] font-medium">Mensajes de motivación</span>
            <button onClick={() => setRemindMotivation(!remindMotivation)} className={`w-12 h-6 rounded-full transition flex items-center ${remindMotivation ? 'bg-[#7C3AED]' : 'bg-[#2D3E50]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition ${remindMotivation ? 'ml-1' : 'ml-6'}`}></div>
            </button>
          </div>

          <button onClick={() => { setShowEmotionSaved(true); setTimeout(() => { setShowEmotionSaved(false); navigate('profile'); }, 2000); }} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-3 rounded-2xl transition mt-6">
            Guardar
          </button>

          {showEmotionSaved && (
            <div className="bg-[#1A2839] border border-[#38BDF8] rounded-xl p-4">
              <p className="text-[#38BDF8]">✓ Notificaciones actualizadas.</p>
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  // 25. Premium
  if (currentScreen === 'premium') {
    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Premium" />

        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Free Plan */}
          <div className="bg-[#1A2839] border border-[#2D3E50] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#F1F5F9] mb-4">Plan Gratuito</h3>
            <ul className="space-y-2 text-[#94A3B8] text-sm mb-4">
              <li>✓ Registro de emociones</li>
              <li>✓ Análisis IA básico</li>
              <li>✓ Comunidad anónima</li>
              <li>✗ Reportes avanzados</li>
            </ul>
            <p className="text-[#7C3AED] font-bold text-sm">Actual</p>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#38BDF8]/20 border border-[#7C3AED] rounded-2xl p-6">
            <h3 className="text-xl font-bold text-[#F1F5F9] mb-4">Plan Premium</h3>
            <ul className="space-y-2 text-[#F1F5F9] text-sm mb-4">
              <li>✓ Todo lo del plan gratuito</li>
              <li>✓ Reportes avanzados ilimitados</li>
              <li>✓ Análisis profundo de patrones</li>
              <li>✓ Recomendaciones personalizadas 24/7</li>
              <li>✓ Acceso a recursos de orientación</li>
            </ul>
            <p className="text-[#38BDF8] font-bold text-lg mb-4">$4.99 USD/mes</p>
            <button onClick={() => { setIsPremium(true); setShowEmotionSaved(true); setTimeout(() => setShowEmotionSaved(false), 2000); }} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition">
              Probar Premium
            </button>
          </div>

          {showEmotionSaved && (
            <div className="bg-[#1A2839] border border-[#38BDF8] rounded-xl p-4">
              <p className="text-[#38BDF8]">✓ ¡Bienvenido a Premium! Acceso ilimitado activado.</p>
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    );
  }

  // 26. Advanced Reports (locked for non-premium)
  if (currentScreen === 'reports') {
    if (!isPremium) {
      return (
        <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
          <Header title="Reportes avanzados" />
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-[#F1F5F9] mb-2">Contenido Premium</h2>
            <p className="text-[#94A3B8] text-center mb-8">Accede a reportes avanzados y análisis profundos con Premium.</p>
            <button onClick={() => navigate('premium')} className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold py-4 rounded-2xl transition">
              Ir a Premium
            </button>
          </div>
          <BottomNav />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex flex-col pb-20">
        <Header title="Reportes avanzados" />

        <div className="flex-1 px-6 py-6 space-y-6">
          {/* Emotion Chart */}
          <div className="bg-[#1A2839] rounded-2xl p-4 border border-[#2D3E50]">
            <h3 className="font-bold text-[#F1F5F9] mb-4">Emociones esta semana</h3>
            <div className="space-y-2">
              {['Feliz', 'Tranquilo', 'Ansioso', 'Cansado'].map((emotion, i) => (
                <div key={emotion} className="flex items-center gap-3">
                  <span className="text-sm text-[#94A3B8] w-16">{emotion}</span>
                  <div className="flex-1 bg-[#0F172A] rounded-full h-2">
                    <div className="bg-[#7C3AED] h-2 rounded-full" style={{ width: `${[70, 60, 40, 50][i]}%` }}></div>
                  </div>
                  <span className="text-sm text-[#7C3AED] font-bold">{[7, 6, 4, 5][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stress Trend */}
          <div className="bg-[#1A2839] rounded-2xl p-4 border border-[#2D3E50]">
            <h3 className="font-bold text-[#F1F5F9] mb-4">Tendencia de estrés</h3>
            <div className="flex items-end gap-2 h-32">
              {[45, 55, 50, 65, 60, 70, 55].map((val, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-[#38BDF8] to-[#7C3AED] rounded-t" style={{ height: `${(val / 100) * 100}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-[#94A3B8] mt-2">
              <span>Lun</span>
              <span>Dom</span>
            </div>
          </div>

          {/* Sleep Insights */}
          <div className="bg-[#1A2839] rounded-2xl p-4 border border-[#2D3E50]">
            <h3 className="font-bold text-[#F1F5F9] mb-2">Sueño promedio</h3>
            <p className="text-2xl font-bold text-[#38BDF8]">6.5 horas</p>
            <p className="text-xs text-[#94A3B8] mt-2">Recomendación: 8 horas/noche</p>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-[#0F172A] max-w-md mx-auto flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#94A3B8]">Pantalla no encontrada</p>
        <button onClick={() => navigate('dashboard')} className="mt-4 text-[#7C3AED] hover:underline">
          Volver al dashboard
        </button>
      </div>
    </div>
  );
}
