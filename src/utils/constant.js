// 参数类型
export const paramTypes = [
  { label: '变量', value: 1 },
  { label: '定值', value: 2 },
]
// 传参类型
export const paramVarTypes = [
  { label: '字符', value: 'string' },
  { label: '数字', value: 'number' },
  { label: '小数', value: 'decimal' },
  { label: '布尔', value: 'boolean' },
  { label: '日期', value: 'datetime' },
]
// 传参位置
export const paramVarLocations = [
  { label: 'url', value: 'url' },
  { label: 'header', value: 'header' },
  { label: 'body', value: 'body' },
]
// 接口类型
export const methodTypes = [
  { label: 'httpGet', value: 1 },
  { label: 'httpPost', value: 2 },
]
// 调用方式
export const contentTypes_1 = [
  { label: '默认', value: 1 },
]
export const contentTypes_2 = [
  { label: '表单', value: 2 },
  { label: 'JSON', value: 3 },
  { label: 'XML', value: 4 },
]


// Groovy脚本 模板
export const groovyTemp = `import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * groovy脚本实现类
 */
public class GroovyCallerImpl implements GroovyCaller{

    /**
     * 解析
     * @param inMap      标识入参
     * @param resultInMap 数据返回入参
     * @return
     */
    @Override
    public Map<String, Object> parse(Map<String, String> inMap, Map<String, List<Object>> resultInMap) {

        Map<String,Object> result = new HashMap<>();
        // TODO 请在此处补充需要实现的业务逻辑


        return result;
    }
}
`;
