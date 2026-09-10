import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/initials';
import { AVATAR_PRESETS } from '../../utils/avatar';
import type { User } from '../../types';
import { CreateProfileModal } from './CreateProfileModal';
import { PinModal } from './PinModal';
import { useState, useCallback } from 'react';

export function ProfilePicker() {
  const { profiles, pendingStaff, setPendingStaff, needPin, setNeedPin, showCreateModal, setShowCreateModal, setScreen } = useAuth();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (profile: User) => {
    setSelectedId(profile.id);
    setPendingStaff(profile);
    setNeedPin(true);
  };

  const handlePinSuccess = useCallback(async () => {
    setNeedPin(false);
    setPendingStaff(null);
    setSelectedId(null);
    setScreen('success');
    setTimeout(() => setScreen('app'), 1500);
  }, [setNeedPin, setPendingStaff, setScreen]);

  const handleCreateProfile = () => {
    setShowCreateModal(true);
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#131315',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: 20,
    }}>
      {/* Gradient orbs */}
      <div style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(179,135,42,0.25), transparent 70%)',
        top: -100, left: -100, filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute', width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(15,107,77,0.2), transparent 70%)',
        bottom: -80, right: -80, filter: 'blur(60px)',
      }} />

      {/* Title */}
      <h1 style={{
        fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700,
        color: '#fff', marginBottom: 8, zIndex: 1,
      }}>
        Who's teaching today?
      </h1>
      <p style={{ fontSize: 14, color: '#9497a1', marginBottom: 32, zIndex: 1 }}>
        Select your profile to continue
      </p>

      {/* Profile grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 16, maxWidth: 600, width: '100%', zIndex: 1,
      }}>
        {profiles.map((profile, i) => (
          <button
            key={profile.id}
            onClick={() => handleSelect(profile)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              padding: '20px 16px', borderRadius: 'var(--r-lg)',
              background: selectedId === profile.id ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer', transition: 'all 0.2s',
              animation: `fadeInUp 0.35s ease-out both`,
              animationDelay: `${i * 80}ms`,
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = selectedId === profile.id ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              width: 64, height: 64, borderRadius: 18,
              background: `linear-gradient(150deg, ${AVATAR_PRESETS[i % AVATAR_PRESETS.length][0]}, ${AVATAR_PRESETS[i % AVATAR_PRESETS.length][1]})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Space Grotesk', fontSize: 22, fontWeight: 700, color: '#fff',
            }}>
              {getInitials(profile.name)}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{profile.name}</span>
            <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--gold)', textTransform: 'capitalize' }}>
              {profile.role}
            </span>
          </button>
        ))}

        {/* Add Profile card */}
        <button
          onClick={handleCreateProfile}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
            padding: '20px 16px', borderRadius: 'var(--r-lg)',
            border: '2px dashed rgba(255,255,255,0.15)',
            background: 'transparent', cursor: 'pointer',
            transition: 'all 0.2s',
            animation: `fadeInUp 0.35s ease-out both`,
            animationDelay: `${profiles.length * 80}ms`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            border: '2px dashed rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: '#9497a1',
          }}>+</div>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#9497a1' }}>Add Profile</span>
        </button>
      </div>

      {showCreateModal && (
        <CreateProfileModal onClose={() => setShowCreateModal(false)} />
      )}
      {needPin && pendingStaff && (
        <PinModal
          profileName={pendingStaff.name}
          onSuccess={handlePinSuccess}
          onCancel={() => { setNeedPin(false); setPendingStaff(null); setSelectedId(null); }}
        />
      )}
    </div>
  );
}
