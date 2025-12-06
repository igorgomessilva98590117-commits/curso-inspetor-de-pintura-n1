import { supabase } from '../lib/supabase';

export const getIntroVideo = async () => {
  try {
    // Lista arquivos na pasta 'videos' do Storage
    const { data: files, error } = await supabase.storage
      .from('videos') // Nome do bucket no Supabase
      .list('intro', {
        limit: 1,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      console.error('Erro ao buscar vídeo:', error);
      return null;
    }

    if (files && files.length > 0) {
      // Pega a URL pública do primeiro vídeo
      const { data } = supabase.storage
        .from('videos')
        .getPublicUrl(`intro/${files[0].name}`);

      return data.publicUrl;
    }

    return null;
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
};

