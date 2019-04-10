
//加载字体文件
import cn from '@/assets/lang/cn.json';

/**
 * 语言文件处理
 */
export class Language {

    public lang: {
        /**
         * 
         */
        name: string
    }

    public setLang() {
        this.lang = cn;
    }

}