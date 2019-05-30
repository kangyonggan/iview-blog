export default {
    'data': {
        'article': {
            'articleId': 1,
            'createdTime': 1559033727000,
            'title': 'SpringBoot动态数据源的配置和使用',
            'summary': 'SpringBoot动态数据源的配置和使用,SpringBoot动态数据源的配置和使用,SpringBoot动态数据源的配置和使用,SpringBoot动态数据源的配置和使用',
            'content': '## 依赖\n' +
                '`pom.xml`:\n' +
                '```\n' +
                '<!--eureka-->\n' +
                '<eureka.version>2.0.0.RELEASE</eureka.version>\n' +
                '\n' +
                '...\n' +
                '\n' +
                '<dependency>\n' +
                '    <groupId>org.springframework.cloud</groupId>\n' +
                '    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>\n' +
                '    <version>${eureka.version}</version>\n' +
                '</dependency>\n' +
                '```\n' +
                '\n' +
                '## 配置\n' +
                '`application.yml`:\n' +
                '```\n' +
                'spring:\n' +
                '  application:\n' +
                '    name: DEMO\n' +
                '\n' +
                'eureka:\n' +
                '  instance:\n' +
                '  \t# true: 使用ip-address作为客户端ip，false：使用本地第一个非回路ip作为客户端ip\n' +
                '    prefer-ip-address: true\n' +
                '    ip-address: 172.190.105.90\n' +
                '  client:\n' +
                '    serviceUrl:\n' +
                '      # 注册中心地址\n' +
                '      defaultZone: http://172.190.105.60:8761/eureka/,http://172.190.105.61:8761/eureka/\n' +
                '```\n' +
                '\n' +
                '`Application.java`:\n' +
                '在Application上添加@EnableEurekaClient启用eureka客户端，并且配置一个具有负载均衡的RestTemplate。\n' +
                '```\n' +
                '@...\n' +
                '@EnableEurekaClient\n' +
                '@...\n' +
                'public class Application {\n' +
                '\n' +
                '    public static void main(String[] args) {\n' +
                '        SpringApplication.run(Application.class, args);\n' +
                '    }\n' +
                '\n' +
                '    @Bean\n' +
                '    @LoadBalanced\n' +
                '    RestTemplate restTemplate() {\n' +
                '        return new RestTemplate();\n' +
                '    }\n' +
                '\n' +
                '}\n' +
                '```\n' +
                '\n' +
                '## 使用\n' +
                '```\n' +
                '@Autowired\n' +
                'private RestTemplate restTemplate;\n' +
                '\n' +
                'restTemplate.getForObject("http://FES/threeFunRatings", String.class);\n' +
                '```\n' +
                '\n' +
                '其中`FES`是别的项目的`spring.application.name`，然后由restTemplate转换为对应的域名或ip地址（负载均衡+本地缓存）。\n' +
                '\n' +
                '> eureka会将Controller中有@RequestMapping等注解的方法提供出去。\n' +
                '\n' +
                '## 网络\n' +
                '在上述例子中，有几点网络要求：\n' +
                '1. DEMO 到两个注册中心8761的网络要通。【服务注册、维持心跳时和域名转换时需要】\n' +
                '2. DEMO 到服务提供方FES各个服务器（对应的端口）的网络要通。【远程调用时需要】\n',
            'viewNum': 34,
            'isDeleted': 0,
            'updatedTime': 1559033727000
        }
    },
    'respCo': '0000',
    'respMsg': '操作成功'
};
