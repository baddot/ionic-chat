## ��ϵ�˵������ʹ��
##### ��Դ����
```
<script src="lib/hydContactsNav/directive.js"></script>
<link rel="stylesheet" href="lib/hydContactsNav/contactNavStyle.css"/>
```
#####ģ��������
 ��Դ��Ϊ:hyd.directives
#####��������ʹ��
�ڿ�������ע��contactsNavUtil�����࣬���÷���sortByFirstCode��������������
```
contactsNavUtil.sortByFirstCode(data,attrName);
@data {Array} [��������û���������]
@attrName {string} [��ʾ���ݶ�����ĸ����Խ��з�������]
����ֵ����������ò�����������������󣬴�ʱ��$scope�󶨼���
```

#####ǰ̨��ǩʹ��
```
<ion-pane>  
    <ion-header-bar class="bar-stable">    
        <h1 class="title">��ϵ�˲��������ʾdemo</h1>  
    </ion-header-bar>  
      <ion-content delegate-handle="contactsScroll">    
          <ion-list>      
              <div ng-repeat="friends in friendsArray">        
                  <a class="contacts_a" href="javascript:void(0)" id="{{friends.id}}">{{friends.firstCode}}</a>        
                  <ion-item ng-repeat="friend in friends.data">          
                      <h3>{{friend.name}}</h3>        
                  </ion-item>      
               </div>    
          </ion-list>  
      </ion-content>  
    <hyd-contacts-nav hyd-delegate-handle="contactsScroll" hyd-contacts-data="friendsArray"></hyd-contacts-nav>
</ion-pane> 
```
***
######ע�⴦
1. hyd-contacts-nav��ǩ��������Ҫ���ԣ�
 hyd-delegate-handle��������ion-content��delegate-handle����ֵ
 hyd-contacts-data���������������
2. ѭ��������һ��ͨ��a��ǩ�����зָ�����ʱa��ǩ��id���Ա�������������id���а󶨣���Ϊָ��ʱͨ��Ѱ�����Ԫ�������ж�λ�ġ�