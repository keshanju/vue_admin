
import { Component, Vue  } from "vue-property-decorator";

/**
 * 
 */
@Component({
    components:{

    }
})
export default class testController extends Vue {
    /**
     * 
     */
    private title="";

    /**
     * 
     */
    created(){
        this.title ="我是测试标题";
    }

    /**
     * 
     */
    private testHandler(){
        alert("维吾尔文");
    }
}