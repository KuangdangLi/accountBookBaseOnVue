import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store222 = {
  ...recordStore,
    ...tagStore
}

export default store222;